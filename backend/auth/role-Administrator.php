<?php
require_once('auth.php');

$request_headers = apache_request_headers();
$auth = new Auth($request_headers);

if(!$auth->verify($auth->getToken(), $secret_key)) exit;
$payload = $auth->getPayload();

if($payload->premission != 'Administrator'){
    http_response_code(401); 
    echo json_encode(['message'=>'401 Unauthorized']); 
    exit;
}