<?php
declare(strict_types=1);

// One server-owned contract drives validation and the admin form fields.
$field = static fn(string $key, string $label, string $type = 'text', bool $required = false, array $options = []): array => compact('key', 'label', 'type', 'required', 'options');
$title = $field('title', 'Title', 'text', true);
$summary = $field('summary', 'Short introduction', 'textarea');
$body = $field('body', 'Main content', 'textarea');
$image = $field('image', 'Cover image URL', 'image');
$seo = [$field('seo_title', 'Search engine title'), $field('seo_description', 'Search engine description', 'textarea')];
$module = static fn(string $label, string $description, array $fields): array => compact('label', 'description', 'fields');

return [
    'pages' => $module('Pages', 'Website page copy and search descriptions. Public page migration is tracked separately.', [$title, $field('path', 'Website path', 'path', true), $summary, $body, $image, ...$seo]),
    'divisions' => $module('Divisions', 'Manage the story, services and process of each business division.', [$title, $summary, $body, $field('services', 'Services — one per line', 'textarea'), $field('process', 'Working process — one step per line', 'textarea'), $image, ...$seo]),
    'projects' => $module('Projects', 'Document real work, your role and the results delivered.', [$title, $summary, $image, $field('division', 'Division'), $field('client', 'Approved client name / Confidential client'), $field('type', 'Project type', 'select', true, ['Client work', 'Own product', 'Internal initiative']), $field('work_status', 'Work status', 'select', true, ['Completed', 'Ongoing', 'Concept']), $field('year', 'Delivery year'), $field('challenge', 'Client challenge', 'textarea'), $field('role', 'Our role and deliverables', 'textarea', true), $field('results', 'Verified results', 'textarea'), $field('url', 'Live project link', 'url'), $field('permission', 'Client and media publication permission confirmed', 'checkbox', true), ...$seo]),
    'team' => $module('Team', 'Leadership and team profiles approved for publication.', [$title, $field('position', 'Position', 'text', true), $body, $image, $field('url', 'Professional profile link', 'url')]),
    'posts' => $module('Insights', 'Articles and business updates.', [$title, $summary, $body, $image, $field('author', 'Author'), $field('date', 'Article date', 'date'), ...$seo]),
    'press' => $module('Press', 'Official announcements and press coverage.', [$title, $summary, $body, $image, $field('date', 'Publication date', 'date'), $field('url', 'Source link', 'url'), ...$seo]),
    'jobs' => $module('Careers', 'Open positions and how candidates should apply.', [$title, $field('location', 'Location'), $field('employment', 'Employment type', 'select', true, ['Full time', 'Part time', 'Contract', 'Internship']), $body, $field('deadline', 'Application deadline', 'date'), $field('email', 'Application email', 'email', true)]),
    'gallery' => $module('Gallery', 'Real company and project images with accurate captions.', [$title, $image, $field('caption', 'Caption', 'textarea'), $field('division', 'Division')]),
    'brands' => $module('Brands & products', 'Your businesses and products, with accurate launch status.', [$title, $summary, $image, $field('url', 'Website', 'url'), $field('stage', 'Stage', 'select', true, ['Operating', 'In development', 'Concept'])]),
    'locations' => $module('Global presence', 'Approved offices and operating locations.', [$title, $field('country', 'Country'), $field('address', 'Address', 'textarea'), $field('presence', 'Presence type', 'select', true, ['Office', 'Trade market', 'Partner location']), $field('email', 'Contact email', 'email'), $field('phone', 'Phone')]),
    'timeline' => $module('Timeline', 'Documented company milestones.', [$title, $field('date', 'Milestone date', 'date', true), $body, $image]),
    'testimonials' => $module('Testimonials', 'Client feedback with permission to publish.', [$title, $field('position', 'Client position / company'), $field('quote', 'Approved quote', 'textarea', true), $image, $field('permission', 'Client has approved this public quote', 'checkbox', true)]),
    'credentials' => $module('Credentials', 'Certifications with issuer, validity and verification source.', [$title, $field('issuer', 'Issuer', 'text', true), $field('reference', 'Certificate reference'), $field('expires', 'Expiry date', 'date'), $field('url', 'Verification URL', 'url'), $image]),
    'metrics' => $module('Verified metrics', 'Publish only figures supported by company records.', [$title, $field('value', 'Display value', 'text', true), $field('source', 'Public source or explanation', 'textarea', true), $field('date', 'As of date', 'date', true)]),
    'navigation' => $module('Navigation', 'Header and footer link labels, destinations and display order.', [$title, $field('url', 'Link destination', 'link', true), $field('placement', 'Placement', 'select', true, ['Header', 'Footer'])]),
    'settings' => $module('Company settings', 'Public business information only. Do not enter passwords or SMTP secrets.', [$title, $summary, $field('email', 'Contact email', 'email'), $field('phone', 'Contact phone'), $field('address', 'Office address', 'textarea'), $field('url', 'Main social profile', 'url'), $image]),
];
