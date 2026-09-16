<?php
declare(strict_types=1);

final class JobApplications
{
    public function __construct(private Database $db, private array $config) {}

    public function create(): array
    {
        $file = $_FILES['resume'] ?? null;
        if (!$file || $file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) Http::fail(422, 'Attach your CV as a PDF up to 5 MB.');
        if ((int)$file['size'] < 1 || (int)$file['size'] > 5 * 1024 * 1024) Http::fail(413, 'CV files must be no larger than 5 MB.');
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        if ($mime !== 'application/pdf' || file_get_contents($file['tmp_name'], false, null, 0, 5) !== '%PDF-') Http::fail(422, 'Only valid PDF CV files are accepted.');
        if (($_POST['consent'] ?? '') !== 'yes') Http::fail(422, 'Confirm that Network71 may process this application for recruitment.');

        $name = Http::string($_POST, 'name', 120, true);
        $email = strtolower(Http::string($_POST, 'email', 190, true));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) Http::fail(422, 'Enter a valid email address.');
        $phone = Http::string($_POST, 'phone', 40);
        $cover = Http::string($_POST, 'cover_letter', 5000);
        $locale = Sections::locale($_POST['locale'] ?? 'en');
        $slug = Http::string($_POST, 'job_slug', 160, true);
        if ($slug !== 'general' && !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) Http::fail(422, 'Invalid vacancy.');
        $key = Http::string($_POST, 'request_key', 64, true);
        if (!preg_match('/^[a-zA-Z0-9-]{20,64}$/', $key)) Http::fail(422, 'Invalid submission identifier. Refresh and try again.');

        $jobId = null;
        $jobTitle = 'General application';
        if ($slug !== 'general') {
            $row = $this->db->query("SELECT id, published_json FROM content_records WHERE module='jobs' AND slug=? AND locale=? AND status='published' AND published_json IS NOT NULL", [$slug, $locale])->fetch();
            if (!$row) Http::fail(404, 'This vacancy is no longer available.');
            $data = json_decode($row['published_json'], true, 32, JSON_THROW_ON_ERROR);
            $deadline = is_string($data['deadline'] ?? null) ? $data['deadline'] : '';
            $today = (new DateTimeImmutable('now', new DateTimeZone('Asia/Dhaka')))->format('Y-m-d');
            if ($deadline !== '' && $deadline < $today) Http::fail(422, 'The application deadline has passed.');
            $jobId = (int)$row['id'];
            $jobTitle = (string)($data['title'] ?? 'Vacancy');
        }

        $hash = hash('sha256', json_encode([$jobId,$slug,$locale,$name,$email,$phone,$cover,hash_file('sha256',$file['tmp_name'])], JSON_THROW_ON_ERROR));
        $existing = $this->db->query('SELECT reference,request_hash FROM job_applications WHERE request_key=?', [$key])->fetch();
        if ($existing) {
            if (!hash_equals($existing['request_hash'], $hash)) Http::fail(409, 'This submission identifier has already been used.');
            return ['reference'=>$existing['reference'], 'message'=>'Your application has been received.'];
        }

        $dir = rtrim((string)$this->config['storage'], '/\\') . '/applications';
        if (!is_dir($dir) && !mkdir($dir, 0700, true)) throw new RuntimeException('Cannot create private application storage.');
        $filename = bin2hex(random_bytes(20)) . '.pdf';
        $path = $dir . '/' . $filename;
        if (!move_uploaded_file($file['tmp_name'], $path)) throw new RuntimeException('Cannot store the application file.');
        @chmod($path, 0600);
        $reference = 'JOB-' . strtoupper(bin2hex(random_bytes(8)));
        try {
            $this->db->query('INSERT INTO job_applications(reference,job_record_id,job_slug,job_title,locale,name,email,phone,cover_letter,consent_at,request_key,request_hash,resume_filename,resume_original_name,resume_mime,resume_bytes,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(),?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())', [$reference,$jobId,$slug,$jobTitle,$locale,$name,$email,$phone,$cover,$key,$hash,$filename,mb_substr(basename((string)$file['name']),0,255),'application/pdf',filesize($path)]);
        } catch (Throwable $error) {
            if (is_file($path)) unlink($path);
            throw $error;
        }
        return ['reference'=>$reference, 'message'=>'Your application has been received.'];
    }

    public function listing(string $where = '1=1', array $params = []): array
    {
        $page = max(1, min(100000, (int)($_GET['page'] ?? 1)));
        $total = (int)$this->db->query("SELECT COUNT(*) FROM job_applications a WHERE $where", $params)->fetchColumn();
        $items = $this->db->query("SELECT a.id,a.reference,a.job_slug,a.job_title,a.locale,a.name,a.email,a.phone,a.cover_letter,a.resume_original_name,a.resume_bytes,a.status,a.assigned_to,a.created_at,u.name AS assignee_name FROM job_applications a LEFT JOIN admin_users u ON u.id=a.assigned_to WHERE $where ORDER BY a.id DESC LIMIT 30 OFFSET ".(($page-1)*30), $params)->fetchAll();
        $ids = array_map(static fn(array $item): int => (int)$item['id'], $items);
        $notes = [];
        if ($ids) {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            foreach ($this->db->query("SELECT n.id, n.application_id, n.note, n.created_at, u.name AS author_name FROM application_notes n JOIN admin_users u ON u.id = n.author_id WHERE n.application_id IN ($placeholders) ORDER BY n.id", $ids)->fetchAll() as $note) {
                $notes[(int)$note['application_id']][] = $note;
            }
        }
        foreach ($items as &$item) $item['notes'] = $notes[(int)$item['id']] ?? [];
        unset($item);
        $assignees = $this->db->query('SELECT id,name FROM admin_users WHERE active=1 ORDER BY name,id')->fetchAll();
        $counts = [];
        foreach ($this->db->query('SELECT status, COUNT(*) AS n FROM job_applications GROUP BY status')->fetchAll() as $row) $counts[$row['status']] = (int)$row['n'];
        return ['items'=>$items,'assignees'=>$assignees,'counts'=>$counts,'total'=>$total,'page'=>$page,'pages'=>max(1,(int)ceil($total/30))];
    }

    public function addNote(int $id, array $input, array $user): void
    {
        $note = Http::string($input, 'note', 2000, true);
        $this->db->transaction(function () use ($id, $note, $user): void {
            if (!$this->db->query('SELECT id FROM job_applications WHERE id=? FOR UPDATE', [$id])->fetch()) Http::fail(404, 'Application not found.');
            $this->db->query('INSERT INTO application_notes (application_id, author_id, note, created_at) VALUES (?, ?, ?, UTC_TIMESTAMP())', [$id, $user['id'], $note]);
            $this->db->query('UPDATE job_applications SET updated_at=UTC_TIMESTAMP() WHERE id=?', [$id]);
            $this->db->audit((int)$user['id'], 'note_application', 'applications', $id);
        });
    }

    public function update(int $id, array $input, array $user): void
    {
        $status = $input['status'] ?? null;
        $assigned = $input['assigned_to'] ?? null;
        if ($status !== null && !in_array($status, ['new','reviewing','interview','rejected','hired','withdrawn'], true)) Http::fail(422, 'Invalid application status.');
        if ($assigned !== null && (!is_int($assigned) || $assigned < 1)) Http::fail(422, 'Invalid assignee.');
        if ($status === null && !array_key_exists('assigned_to', $input)) Http::fail(422, 'Choose a status or assignee.');
        $this->db->transaction(function () use ($id,$status,$assigned,$input,$user): void {
            if (!$this->db->query('SELECT id FROM job_applications WHERE id=? FOR UPDATE',[$id])->fetch()) Http::fail(404,'Application not found.');
            if ($assigned !== null && !$this->db->query('SELECT id FROM admin_users WHERE id=? AND active=1',[$assigned])->fetch()) Http::fail(422,'Choose an active assignee.');
            if ($status !== null) $this->db->query('UPDATE job_applications SET status=?,updated_at=UTC_TIMESTAMP() WHERE id=?',[$status,$id]);
            if (array_key_exists('assigned_to',$input)) $this->db->query('UPDATE job_applications SET assigned_to=?,updated_at=UTC_TIMESTAMP() WHERE id=?',[$assigned,$id]);
            $this->db->audit((int)$user['id'],'update_application','applications',$id);
        });
    }

    public function download(int $id): never
    {
        $row = $this->db->query('SELECT resume_filename,resume_original_name,resume_bytes FROM job_applications WHERE id=?',[$id])->fetch();
        $path = $row ? rtrim((string)$this->config['storage'], '/\\').'/applications/'.$row['resume_filename'] : '';
        if (!$row || !is_file($path)) Http::fail(404,'CV not found.');
        $fallback = preg_replace('/[^A-Za-z0-9._-]/','_',basename($row['resume_original_name'])) ?: 'resume.pdf';
        header('Content-Type: application/pdf');
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: private, no-store');
        header('Content-Disposition: attachment; filename="'.$fallback.'"; filename*=UTF-8\'\''.rawurlencode(basename($row['resume_original_name'])));
        header('Content-Length: '.filesize($path));
        readfile($path);
        exit;
    }
}
