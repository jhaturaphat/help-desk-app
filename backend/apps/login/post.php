<?php
include_once('./auth/jwt_helper.php');

$data = json_decode(file_get_contents('php://input')); //get the data form json
//connect and get users from json database

if( isset($data->username) && isset($data->password) ) {
    if ( empty($data->username) )
    {
        http_response_code(400);
        exit(json_encode(['message' => 'The username is required']));
    }

    elseif ( empty($data->password) )
    {
        http_response_code(400);
        exit(json_encode(['message' => 'The password is required']));
    }

    $username = mysqli_real_escape_string($database, $data->username);
    $password = mysqli_real_escape_string($database, $data->password);
    $sql = "SELECT id, firstname, lastname, email, premission FROM members WHERE username = '$username' AND password = '$password'";   
    $query = mysqli_query($database,$sql);
    $result = mysqli_fetch_array($query, MYSQLI_ASSOC);
    if(empty($result)){
        http_response_code(400);
        exit(json_encode(['message' => 'Username or Password is invalid']));
    }
    $payload = array();
    $payload['id'] = $result['id'];
    $payload['email'] = $result['email'];
    $payload['premission'] = $result['premission'];    
    //unset($result['id']);
    $token['token'] = JWT::encode($payload, $secret_key);
    $token['remember'] = $data->remember;
    echo json_encode($token);

    exit;
}
