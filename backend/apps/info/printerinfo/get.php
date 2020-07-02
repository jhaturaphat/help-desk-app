<?php

$sql = "SELECT * FROM printer_info";
$query = mysqli_query($database, $sql);
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

echo json_encode($result);