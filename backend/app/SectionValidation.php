<?php
declare(strict_types=1);

final class SectionValidation
{
    public static function clean(array $schema, mixed $value, string $path = 'content'): mixed
    {
        if ($value === null && ($schema['nullable'] ?? false)) return null;
        switch ($schema['type']) {
            case 'null':
                if ($value !== null) Http::fail(422, "Expected empty field at $path.");
                return null;
            case 'fixed':
                if (!in_array($value, $schema['values'], true)) Http::fail(422, "Structural field $path cannot be changed.");
                return $value;
            case 'object':
                if (!is_array($value) || (array_is_list($value) && $value !== [])) Http::fail(422, "Expected fields at $path.");
                $clean = [];
                foreach ($schema['fields'] as $key => $field) {
                    if (!array_key_exists($key, $value) && ($field['optional'] ?? false)) continue;
                    if (!array_key_exists($key, $value)) Http::fail(422, "Missing $path.$key.");
                    $clean[$key] = self::clean($field, $value[$key], "$path.$key");
                }
                return $clean;
            case 'array':
                if (!is_array($value) || !array_is_list($value) || count($value) > $schema['max']) Http::fail(422, "Invalid list at $path.");
                return array_map(fn($item) => self::clean($schema['item'], $item, $path), $value);
            case 'boolean':
                if (!is_bool($value)) Http::fail(422, "Expected checkbox at $path.");
                return $value;
            case 'number':
                if (!is_int($value) && !is_float($value)) Http::fail(422, "Expected number at $path.");
                if (!is_finite((float)$value) || abs($value) > 1000000000) Http::fail(422, "Number too large at $path.");
                return $value;
            case 'string':
                if (!is_string($value) || mb_strlen($value) > 20000) Http::fail(422, "Invalid text at $path.");
                if (($schema['format'] ?? '') === 'url' && $value !== '') {
                    $local = preg_match('~^(?:/(?!/)|#)[^\\\\\x00-\x20]*$~', $value);
                    $web = filter_var($value, FILTER_VALIDATE_URL) && in_array(strtolower(parse_url($value, PHP_URL_SCHEME) ?? ''), ['https','http'], true);
                    $mail = str_starts_with($value,'mailto:') && filter_var(explode('?',substr($value,7))[0],FILTER_VALIDATE_EMAIL) && !preg_match('/[\x00-\x1f]/',$value);
                    if (!$local && !$web && !$mail) Http::fail(422, "Invalid link at $path.");
                }
                return $value;
        }
        throw new RuntimeException('Unknown section field type.');
    }
}
