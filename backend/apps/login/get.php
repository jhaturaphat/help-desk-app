<?php

require_once('./auth/auth.php');

$request_headers = apache_request_headers();
$auth = new Auth($request_headers);

if(!$auth->verify($auth->getToken(), $secret_key)) exit;
$payload = $auth->getPayload();

$sql = "SELECT * FROM members WHERE id=".$payload->id;

$query = mysqli_query($database,$sql);
    $result = mysqli_fetch_array($query, MYSQLI_ASSOC);
    if(empty($result)){
        http_response_code(400);
        exit(json_encode(['message' => 'Username or Password is invalid']));
    }
    unset($result['id']);
    unset($result['active']);
    unset($result['password']);
    echo json_encode($result);
