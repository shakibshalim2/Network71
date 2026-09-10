<?php
declare(strict_types=1);
require dirname(__DIR__) . '/app/bootstrap.php';
$schema=json_decode(file_get_contents(dirname(__DIR__).'/content/schema.json'),true,64,JSON_THROW_ON_ERROR);
$count=0;
foreach (['en','bn'] as $locale) {
    $seed=json_decode(file_get_contents(dirname(__DIR__)."/content/seed.$locale.json"),true,64,JSON_THROW_ON_ERROR);
    foreach ($schema as $page=>$definition) foreach ($definition['sections'] as $key=>$field) {
        try { SectionValidation::clean($field,$seed[$page][$key],"$locale/$page/$key"); }
        catch(Throwable $e) { fwrite(STDERR,$e->getMessage().PHP_EOL); exit(1); }
        $count++;
    }
}
foreach (['javascript:alert(1)','//evil.example','/\\evil.example'] as $url) {
    try { SectionValidation::clean(['type'=>'string','format'=>'url'],$url); throw new RuntimeException('Unsafe URL accepted.'); }
    catch(HttpError $e) { if($e->status!==422) throw $e; }
}
echo "Validated $count locale sections and unsafe URL rejection.\n";
