<?php
declare(strict_types=1);
require dirname(__DIR__) . '/app/bootstrap.php';

$row = [
    'reference' => 'N71-TEST123',
    'created_at' => '2026-09-11 00:15:00',
    'name' => 'A <script>alert(1)</script>',
    'email' => 'visitor@example.test',
    'phone' => '',
    'company' => 'Example & Co',
    'subject' => 'Partnership <request>',
    'source' => '/contact?type=partner',
    'message' => "Hello <b>team</b>\nSecond line",
];
$template = EmailTemplate::render($row, ['origin' => 'https://network71.com']);
if (!str_contains($template['html'], 'cid:network71-logo')) throw new RuntimeException('Embedded logo reference missing.');
if (!str_contains($template['html'], 'N71-TEST123') || !str_contains($template['html'], 'Reply to A &lt;script&gt;')) throw new RuntimeException('Reference or reply action missing.');
if (str_contains($template['html'], '<script>') || str_contains($template['html'], '<b>team</b>')) throw new RuntimeException('Unescaped visitor content entered HTML.');
if (!str_contains($template['html'], '&lt;script&gt;') || !str_contains($template['html'], 'Example &amp; Co') || !str_contains($template['html'], 'Second line')) throw new RuntimeException('Escaped content missing.');
if (!str_contains($template['text'], 'NEW WEBSITE ENQUIRY') || !str_contains($template['text'], 'Hello <b>team</b>')) throw new RuntimeException('Plain-text fallback missing.');

require dirname(__DIR__) . '/vendor/autoload.php';
$mail = new \PHPMailer\PHPMailer\PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setFrom('notifications@example.test', 'Network71 website');
$mail->addAddress('inbox@example.test');
$mail->addReplyTo($row['email'], $row['name']);
$mail->addEmbeddedImage(dirname(__DIR__) . '/assets/network71-email-logo.png', 'network71-logo', 'network71-logo.png', 'base64', 'image/png');
$mail->isHTML(true);
$mail->Subject = $template['subject'];
$mail->Body = $template['html'];
$mail->AltBody = $template['text'];
if (!$mail->preSend()) throw new RuntimeException('PHPMailer could not build the message.');
$mime = $mail->getSentMIMEMessage();
if (!str_contains($mime, 'multipart/alternative') || !str_contains($mime, 'multipart/related')) throw new RuntimeException('HTML/plain multipart structure missing.');
if (!str_contains($mime, 'Content-ID: <network71-logo>') || !str_contains($mime, 'Content-Type: image/png')) throw new RuntimeException('Inline logo MIME part missing.');

echo "PASS: branded HTML email, embedded logo MIME, escaped visitor content and plain-text fallback.\n";
