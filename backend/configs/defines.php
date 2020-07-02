<?php

// echo "<pre>";
// print_r($_SERVER);
// echo "</pre>";

$secret_key = 'eyJpZCI6IjEyMyJ9.Oz8zfL6V1xLWOIhA5feevzK_Ui6IJoBOVP90VH8jJyc';
$routes = [];
$route    = str_replace('/backend', '', $_SERVER['PATH_INFO']);  //http://localhost:9000/api/pcinfo
//$route      = str_replace('r=', '', $_SERVER['QUERY_STRING']); //http://localhost/help-desk-api/index.php?r=/api/pcinfo
$method     = $_SERVER['REQUEST_METHOD'];