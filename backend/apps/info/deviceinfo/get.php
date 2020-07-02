<?php

if(isset($_GET['type'])){
    $sql = "SELECT * FROM deviceinfo WHERE type='".$_GET['type']."'";
}else{
    $sql = "SELECT * FROM deviceinfo";
}


$query = mysqli_query($database, $sql);
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

echo json_encode($result);