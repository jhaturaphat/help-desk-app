<?php
if(!isset($_GET['name'])){
    exit('exit');
}

$sql = "SELECT * FROM osinfo WHERE os_ver LIKE '%".$_GET['name']."%' LIMIT 10";
$query = mysqli_query($database, $sql);
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

echo json_encode($result);