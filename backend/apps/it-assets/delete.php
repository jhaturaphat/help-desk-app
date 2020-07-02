<?php

require_once('./auth/role-Administrator.php');

if (isset($_GET['id']) && !empty($_GET['id'])) {

    $sql = "DELETE FROM assets WHERE id=?";

    $stmt = mysqli_prepare($database, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $_GET['id']);
    mysqli_stmt_execute($stmt);

    $error_message = mysqli_error($database);
    if ($error_message) {

        http_response_code(400);
        exit(json_encode(['message' => $error_message]));
    }

    exit(json_encode(['message' => 'success']));
}
