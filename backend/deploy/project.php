<?php
declare(strict_types=1);
// Copy into public_html/project.php; set the private backend path for this host.
require dirname(__DIR__) . '/network71-private/app/bootstrap.php';
try {
    $config=app_config();$db=new Database($config);
    $slug=basename(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH));
    if(!preg_match('/^[a-z0-9-]+$/',$slug))throw new HttpError(404,'Project not found.');
    $row=$db->query("SELECT published_json FROM content_records WHERE module='projects' AND slug=? AND locale='en' AND status='published'",[$slug])->fetch();
    $data=$row?json_decode($row['published_json'],true,32,JSON_THROW_ON_ERROR):null;
    if(!$data || ($data['permission']??false)!==true)throw new HttpError(404,'Project not found.');
    $escape=fn(string $v)=>htmlspecialchars($v,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');
    $title=($data['seo_title']??'')?:$data['title'].' | Network71';$description=($data['seo_description']??'')?:($data['summary']??'');
    $html=file_get_contents(__DIR__.'/index.html');
    $html=preg_replace_callback('~<title>.*?</title>~s',fn()=>'<title>'.$escape($title).'</title>',$html);
    $html=preg_replace('~<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>~i','',$html);
    $html=preg_replace('~<link\s+rel="canonical"[^>]*>~i','',$html);
    $url=rtrim($config['origin'],'/').'/projects/'.$slug;
    $meta='<meta name="description" content="'.$escape($description).'"><meta name="robots" content="index,follow"><link rel="canonical" href="'.$escape($url).'"><meta property="og:type" content="article"><meta property="og:url" content="'.$escape($url).'"><meta property="og:title" content="'.$escape($title).'"><meta property="og:description" content="'.$escape($description).'">';
    $image=$data['image']??'';
    if(str_starts_with($image,'/')&&!str_starts_with($image,'//'))$image=rtrim($config['origin'],'/').$image;
    if(filter_var($image,FILTER_VALIDATE_URL)&&in_array(parse_url($image,PHP_URL_SCHEME),['http','https'],true))$meta.='<meta property="og:image" content="'.$escape($image).'">';
    $story='<noscript><main><h1>'.$escape($data['title']).'</h1><p>'.$escape($description).'</p>';
    foreach(['challenge','role','results'] as $field)if(!empty($data[$field]))$story.='<h2>'.ucfirst($field).'</h2><p>'.nl2br($escape($data[$field])).'</p>';
    $story.='</main></noscript>';
    header('Content-Type: text/html; charset=utf-8');header('Cache-Control: no-cache');
    echo str_replace(['</head>','</body>'],[$meta.'</head>',$story.'</body>'],$html);
} catch(HttpError $error) {http_response_code($error->status);echo '<h1>Project not found</h1><a href="/projects">View projects</a>';}
catch(Throwable $error) {error_log('Project renderer unavailable');http_response_code(503);echo 'Project temporarily unavailable.';}
