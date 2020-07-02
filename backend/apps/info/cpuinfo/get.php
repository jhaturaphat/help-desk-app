<?php
if(!isset($_GET['name'])){
    exit('exit');
}

$sql = "SELECT *, 
CONCAT(vender,' ',model,' ',cpu_core,' ',clock_speed) AS cpuinfo 
FROM cpuinfo WHERE model LIKE '%".$_GET['name']."%' LIMIT 10";
$query = mysqli_query($database, $sql);
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

echo json_encode($result);