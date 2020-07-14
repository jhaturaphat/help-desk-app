<?php


$host       = '127.0.0.1';
$user       = 'root';
$password   = '123456';
$dbname     = 'help-desk';
$database   = mysqli_connect($host, $user, $password, $dbname);
mysqli_set_charset($database,"utf8");
if(!$database)
{
    http_response_code(500);
    echo json_encode([
        'message'   => 'Database connect error.',
        'error'     => mysqli_connect_error()
    ]);
    exit;
}
