<?php
    // ลงทะเบียน Route ให้กับหลังบ้านของเรา
$routes['/api/login']['POST']                = './apps/login/post.php';
$routes['/api/login']['GET']                = './apps/login/get.php';
$routes['/api/auth/info']['GET']             = './auth/example.php';

$routes['/api/locationinfo']['GET']          = './apps/info/locationinfo/get.php';  
$routes['/api/jobpositioninfo']['GET']       = './apps/info/jobpositioninfo/get.php';  
$routes['/api/departmentinfo']['GET']        = './apps/info/departmentinfo/get.php';  
$routes['/api/osinfo']['GET']                = './apps/info/osinfo/get.php';  
$routes['/api/cpuinfo']['GET']               = './apps/info/cpuinfo/get.php';  
$routes['/api/storageinfo']['GET']           = './apps/info/storageinfo/get.php';  
$routes['/api/raminfo']['GET']               = './apps/info/raminfo/get.php'; 
$routes['/api/vgainfo']['GET']               = './apps/info/vgainfo/get.php'; 
$routes['/api/deviceinfo']['GET']            = './apps/info/deviceinfo/get.php'; 
$routes['/api/printerinfo']['GET']           = './apps/info/printerinfo/get.php'; 

$routes['/api/itassets']['GET']              = './apps/it-assets/get.php';
$routes['/api/itassets']['POST']             = './apps/it-assets/post.php';
$routes['/api/itassets']['PUT']              = './apps/it-assets/put.php';
$routes['/api/itassets']['DELETE']           = './apps/it-assets/delete.php';

$routes['/api/register']['POST']             = './apps/register/post.php'; 
