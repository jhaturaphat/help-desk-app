<?php

$data = json_decode(file_get_contents('php://input'));


$sql = "INSERT INTO members (firstname, lastname, email, username, password) VALUES (?,?,?,?,?)";
$stmt = mysqli_prepare($database, $sql);
mysqli_stmt_bind_param($stmt,'sssss',
    $data->firstname,
    $data->lastname,
    $data->email,
    $data->username,
    $data->password 
);
mysqli_stmt_execute($stmt);

$error_message = mysqli_error($database);
    if($error_message) 
    {
        mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
        http_response_code(400);
        exit(json_encode(['message' => $error_message]));
    }

if(!mysqli_affected_rows($database)) {    
    http_response_code(500);
    exit(json_encode(['message' => 'No rows insert '.mysqli_affected_rows($database)]));
}

echo json_encode(['message'=>'success']);
