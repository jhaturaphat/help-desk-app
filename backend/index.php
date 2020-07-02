<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Headers:*');
header('Content-type: application/json; charset=utf-8');

require_once    './configs/defines.php';
require_once    './configs/warning.php';
require         './configs/routes.php';
require_once   './configs/database.php';

if($method === 'OPTIONS') exit;


if(isset($routes[$route][$method]))
{    
    require $routes[$route][$method];
}
else {
    http_response_code(404);
    echo json_encode(['message' => 'Page not found.']);
}
