<?php

/*
$dsn = "mysql:host=192.168.231.222;dbname=help_desk";
$user = "jaturapat";
$passwd = "Kidjs$11443";


try {
    $conn_db = new PDO($dsn, $user, $passwd, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES UTF8"));
    $conn_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $ex) {
    http_response_code(500);
    echo json_encode([
        'message'   => 'database connect error.',
        'error'     => $ex->getMessage()
    ]);
    exit;
}*/


$host       = '192.168.231.222';
$user       = 'jaturapat';
$password   = 'Kidjs$11443';
$dbname     = 'help_desk';
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
