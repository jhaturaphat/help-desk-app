<?php
require_once('./auth/role-Administrator.php');
$data = json_decode(file_get_contents('php://input'));

if (isset($data->deviceinfo) && isset($data->year) && isset($data->location_id) && isset($data->number)
    && isset($data->stock_id) && isset($data->serial_number) && isset($data->job_position_id) && isset($data->department_id)
    && isset($data->raminfo_id) && isset($data->osinfo_id) && isset($data->vgainfo_id) && isset($data->vender)
    && isset($data->storageinfo_id) && isset($data->cpuinfo_id) && isset($data->printer_id)) {
      
/*####################################################### */
mysqli_begin_transaction($database, MYSQLI_TRANS_START_READ_WRITE);

$sql = "UPDATE assets SET device_id=?, `year`=?, location_id=?, department_id=?,`number`=?, stock_id=?, serial_number=?,remark=?,
member=?, job_position_id=?,raminfo_id=?,osinfo_id=?, vgainfo_id=?,vender=?,printer_id=? WHERE id=?";

$stmt = mysqli_prepare($database, $sql);
mysqli_stmt_bind_param($stmt,'ssssssssssiiisii',
    $data->deviceinfo->id,
    $data->year,
    $data->location_id,
    $data->department_id,
    $data->number,
    $data->stock_id,
    $data->serial_number,
    $data->remark,
    $data->member,
    $data->job_position_id,
    $data->raminfo_id,
    $data->osinfo_id,
    $data->vgainfo_id,
    $data->vender,
    $data->printer_id,
    $data->id
);
mysqli_stmt_execute($stmt);  

if(mysqli_affected_rows($database) < 0) {    
    http_response_code(500);
    exit(json_encode(['message' => 'No rows updated '.mysqli_affected_rows($database)]));
}
  
# ตรวจสอบว่า Insert Error หรือไม่
$error_message = mysqli_error($database);
if($error_message) 
{
    mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
    http_response_code(400);
    exit(json_encode(['message' => $error_message]));
}
/*####################################################### */
if(!empty($data->cpuinfo_id)){
    $stmt = mysqli_prepare($database, "DELETE FROM assets_has_cpuinfo WHERE assets_id = ?");
    mysqli_stmt_bind_param($stmt, 'i',$data->id);
    mysqli_stmt_execute($stmt);
    $error_message = mysqli_error($database);
        if($error_message) 
        {
            mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
            http_response_code(400);
            exit(json_encode(['message' => $error_message]));
        }
       
}
/*####################################################### */
if(!empty($data->storageinfo_id)){
    $stmt = mysqli_prepare($database,"DELETE FROM assets_has_storageinfo WHERE assets_id = ?");
    mysqli_stmt_bind_param($stmt, 'i',$data->id);
    mysqli_stmt_execute($stmt);    
    $error_message = mysqli_error($database);
        if($error_message) 
        {
            mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
            http_response_code(400);
            exit(json_encode(['message' => $error_message]));
        }
       
}
/*####################################################### */
 //เก็บ id ของ cupinfo_id ไว้ใน  $cupId ก่อน
 if(!empty($data->cpuinfo_id)){
    $cupId = array();
    foreach($data->cpuinfo_id as $val){
        $cupId[] = $val->id;
    }    
    $values_cpu = implode(',',array_fill(0, count($cupId),'('.$data->id.',?)')); //สร้างรูปแแบตัว (id,?) ตามขนาดข้อมูล
    $query_cpu = "INSERT INTO assets_has_cpuinfo (assets_id, cpuinfo_id) VALUES $values_cpu"; // ทดสอบคำสั่ง echo $query_cpu;
    $stmt_cpu   = mysqli_prepare($database, $query_cpu); 
    mysqli_stmt_bind_param($stmt_cpu, str_repeat('i', count($cupId)), ...$cupId);
    mysqli_stmt_execute($stmt_cpu);
    mysqli_stmt_close($stmt_cpu);

    # ตรวจสอบว่า Insert Error หรือไม่
    $error_message = mysqli_error($database);
    if($error_message) 
    {
        mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
        http_response_code(400);
        exit(json_encode(['message' => $error_message]));
    }
    $items['assets_has_cpuinfo'] = 'OK';
}

/*####################################################### */
//เก็บ id ของ storageinfo_id ไว้ใน $HddId ก่อน
if(!empty($data->storageinfo_id)){
    $HddId = array();
    foreach($data->storageinfo_id as $val){
        $HddId[] = $val->id;
    }    
    $values_hdd = implode(',',array_fill(0, count($HddId),'('.$data->id.',?)')); //สร้างรูปแแบตัว (id,?) ตามขนาดข้อมูล
    $query_hdd = "INSERT INTO assets_has_storageinfo (assets_id, storageinfo_id) VALUES $values_hdd";  // ทดสอบคำสั่ง echo $query_hdd;   
    $stmt_hdd   = mysqli_prepare($database, $query_hdd); 
    mysqli_stmt_bind_param($stmt_hdd, str_repeat('i', count($HddId)), ...$HddId);
    mysqli_stmt_execute($stmt_hdd);
    mysqli_stmt_close($stmt_hdd);
    # ตรวจสอบว่า Insert Error หรือไม่
       $error_message = mysqli_error($database);
       if($error_message) 
       {
           mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
           http_response_code(400);
           exit(json_encode(['message' => $error_message]));
       }
       $items['assets_has_storageinfo'] = 'OK';
   }

   /*####################################################### */
   mysqli_commit($database);
   mysqli_close($database);
   mysqli_stmt_close($stmt);

   echo json_encode(['message' => 'success','insert_items'=>$items]);

}else {
    http_response_code(400);
    exit(json_encode(['message' => 'ข้อมูลไม่ครบ']));
}


