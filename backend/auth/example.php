<?php 

require_once('auth.php');

$request_headers = apache_request_headers();
$auth = new Auth($request_headers);

if(!$auth->verify($auth->getToken(), $secret_key)) exit;

echo json_encode(['message' => 'verify success', 'paypayload' => $auth->getPayload()]);