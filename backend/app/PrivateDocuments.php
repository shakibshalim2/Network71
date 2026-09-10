<?php
declare(strict_types=1);

final class PrivateDocuments
{
    public function __construct(private Database $db, private array $config) {}

    private function project(int $projectId): void
    {
        if (!$this->db->query("SELECT id FROM content_records WHERE id=? AND module='projects'",[$projectId])->fetch()) Http::fail(404,'Project not found.');
    }

    public function listing(int $projectId): array
    {
        $this->project($projectId);
        return ['items'=>$this->db->query('SELECT d.id,d.label,d.original_name,d.mime,d.bytes,d.created_at,u.name AS uploader_name FROM private_documents d JOIN admin_users u ON u.id=d.uploaded_by WHERE d.project_id=? AND d.deleted_at IS NULL ORDER BY d.id DESC',[$projectId])->fetchAll()];
    }

    public function upload(int $projectId,array $user): array
    {
        $this->project($projectId);
        $label=Http::string($_POST,'label',200,true);
        if(($_POST['confirmation']??'')!=='yes') Http::fail(422,'Confirm that this file is necessary internal project evidence.');
        $file=$_FILES['file']??null;
        if(!$file || $file['error']!==UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) Http::fail(422,'Choose a PDF, JPEG or PNG file up to 10 MB.');
        if((int)$file['size']<1 || (int)$file['size']>10*1024*1024) Http::fail(413,'Private documents must be no larger than 10 MB.');
        $mime=(new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        $extensions=['application/pdf'=>'pdf','image/jpeg'=>'jpg','image/png'=>'png'];
        if(!isset($extensions[$mime])) Http::fail(422,'Only PDF, JPEG and PNG evidence files are accepted.');
        if($mime==='application/pdf' && file_get_contents($file['tmp_name'],false,null,0,5)!=='%PDF-') Http::fail(422,'The PDF signature is invalid.');
        if(str_starts_with($mime,'image/')) {
            $size=@getimagesize($file['tmp_name']);
            if(!$size || ($size['mime']??'')!==$mime || $size[0]*$size[1]>20000000) Http::fail(422,'The evidence image is invalid or too large.');
        }
        $dir=rtrim((string)$this->config['storage'],'/\\').'/private-documents';
        if(!is_dir($dir) && !mkdir($dir,0700,true)) throw new RuntimeException('Cannot create private document storage.');
        $filename=bin2hex(random_bytes(20)).'.'.$extensions[$mime];$path=$dir.'/'.$filename;
        if(!move_uploaded_file($file['tmp_name'],$path)) throw new RuntimeException('Cannot store the private document.');
        @chmod($path,0600);
        try {
            $this->db->query('INSERT INTO private_documents(project_id,label,filename,original_name,mime,bytes,uploaded_by,created_at) VALUES (?,?,?,?,?,?,?,UTC_TIMESTAMP())',[$projectId,$label,$filename,mb_substr(basename((string)$file['name']),0,255),$mime,filesize($path),$user['id']]);
            $id=(int)$this->db->pdo->lastInsertId();$this->db->audit((int)$user['id'],'upload_private_document','private_documents',$id);
            return ['id'=>$id];
        } catch(Throwable $error){if(is_file($path))unlink($path);throw $error;}
    }

    public function archive(int $projectId,int $id,array $user): void
    {
        $this->project($projectId);
        $row=$this->db->transaction(function () use ($projectId,$id,$user): array {
            $row=$this->db->query('SELECT filename FROM private_documents WHERE id=? AND project_id=? AND deleted_at IS NULL FOR UPDATE',[$id,$projectId])->fetch();
            if(!$row) Http::fail(404,'Private document not found.');
            $this->db->query('UPDATE private_documents SET deleted_at=UTC_TIMESTAMP() WHERE id=?',[$id]);
            $this->db->audit((int)$user['id'],'archive_private_document','private_documents',$id);
            return $row;
        });
        $path=rtrim((string)$this->config['storage'],'/\\').'/private-documents/'.$row['filename'];
        if(is_file($path) && !unlink($path)) throw new RuntimeException('Private document metadata was archived but its file could not be removed.');
    }

    public function download(int $projectId,int $id): never
    {
        $this->project($projectId);
        $row=$this->db->query('SELECT filename,original_name,mime FROM private_documents WHERE id=? AND project_id=? AND deleted_at IS NULL',[$id,$projectId])->fetch();
        $path=$row?rtrim((string)$this->config['storage'],'/\\').'/private-documents/'.$row['filename']:'';
        if(!$row || !is_file($path)) Http::fail(404,'Private document not found.');
        $fallback=preg_replace('/[^A-Za-z0-9._-]/','_',basename($row['original_name']))?:'evidence';
        header('Content-Type: '.$row['mime']);header('X-Content-Type-Options: nosniff');header('Cache-Control: private, no-store');
        header('Content-Disposition: attachment; filename="'.$fallback.'"; filename*=UTF-8\'\''.rawurlencode(basename($row['original_name'])));
        header('Content-Length: '.filesize($path));readfile($path);exit;
    }
}
