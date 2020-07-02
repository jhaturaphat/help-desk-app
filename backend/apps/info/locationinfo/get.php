<?php
/*
$sql = "select * from job_position";

$stmt = $conn_db->prepare($sql);
$stmt->execute();

$json = [];

while($result = $stmt->fetch(PDO::FETCH_OBJ)){
    $json[] = $result;
}
//JSON_FORCE_OBJECT
echo json_encode($json);*/


if(!isset($_GET['name'])){
    exit('exit');
}

$sql = "SELECT * FROM location WHERE name LIKE '%".$_GET['name']."%' OR name LIKE '%".$_GET['name']."%' LIMIT 10";
$query = mysqli_query($database, $sql);
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

echo json_encode($result);