<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/app/bootstrap.php';$db=new Database(app_config());$sections=new Sections($db);
$owner=$db->query("SELECT id,role FROM admin_users WHERE role='owner' AND active=1 ORDER BY id LIMIT 1")->fetch();
if(!$owner)throw new RuntimeException('Create an owner first.');
$count=0;
foreach($sections->catalog() as $page=>$definition)foreach(['en','bn'] as $locale) {
    $defaults=$sections->defaults($page,$locale);$order=0;
    foreach($definition['sections'] as $key=>$schema) {
        if(!$db->query('SELECT id FROM page_sections WHERE page_key=? AND section_key=? AND locale=?',[$page,$key,$locale])->fetch()) {
            $sections->save($page,$key,['locale'=>$locale,'data'=>$defaults[$key],'version'=>0,'visible'=>true,'order'=>$order],$owner);$count++;
        }
        $order+=10;
    }
}
echo "$count missing templates imported as drafts. Existing records and public content were not changed.\n";
