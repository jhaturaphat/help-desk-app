<?php

$query = mysqli_query($database, "SELECT COUNT(*) AS totalItem FROM assets");
$result = mysqli_fetch_array($query, MYSQLI_ASSOC);
echo json_encode($result);