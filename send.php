<?php

$to      = $_GET["to"];
$subject = $_GET["subject"];
$message = $_GET["message"];
$headers = 'From: ' . $_GET["from"] . "\r\n" .
    'Reply-To: ' . $_GET["from"] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?>