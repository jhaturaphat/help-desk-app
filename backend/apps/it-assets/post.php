<?php
require_once('./auth/role-Administrator.php');

$data = json_decode(file_get_contents('php://input'));

#ตรวจสอบ Validation
if (isset($data->deviceinfo) && isset($data->year) && isset($data->location_id) && isset($data->number)
    && isset($data->stock_id) && isset($data->serial_number) && isset($data->job_position_id) && isset($data->department_id)
    && isset($data->raminfo_id) && isset($data->osinfo_id) && isset($data->vgainfo_id) && isset($data->vender)
    && isset($data->storageinfo_id) && isset($data->cpuinfo_id) && isset($data->printer_id)) {

   /* if (empty($data->deviceinfo)) {

        http_response_code(400);
        exit(json_encode(['message' => 'device_id is required']));

    } elseif (empty($data->year)) {

        http_response_code(400);
        exit(json_encode(['message' => 'year is required']));

    } elseif (empty($data->location_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'location_id is required']));

    } elseif (empty($data->number)) {

        http_response_code(400);
        exit(json_encode(['message' => 'number is required']));

    } elseif (empty($data->stock_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'stock_id is required']));

    } elseif (empty($data->serial_number)) {

        http_response_code(400);
        exit(json_encode(['message' => 'serial_number is required']));

    }elseif (empty($data->job_position_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'job_position_id is required']));

    }elseif (empty($data->department_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'department_id is required']));

    }elseif (empty($data->osinfo_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'osinfo_id is required']));

    }elseif (empty($data->vgainfo_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'vgainfo_id is required']));

    }elseif (empty($data->vender)) {

        http_response_code(400);
        exit(json_encode(['message' => 'vender is required']));

    }elseif (empty($data->printer_id)) {

        http_response_code(400);
        exit(json_encode(['message' => 'printer_id is required']));

    }*/


    mysqli_begin_transaction($database, MYSQLI_TRANS_START_READ_WRITE);
    $query = "INSERT INTO assets (device_id, `year`, location_id, department_id, number,stock_id, serial_number
    ,remark, member,job_position_id, raminfo_id,osinfo_id,vgainfo_id,vender,printer_id) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $stmt   = mysqli_prepare($database, $query);
    mysqli_stmt_bind_param($stmt, 'ssssssssssiiisi', 
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
        $data->printer_id
    );
    mysqli_stmt_execute($stmt);    
    # ตรวจสอบว่า Insert Error หรือไม่
    $error_message = mysqli_error($database);
    if($error_message) 
    {
        mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
        http_response_code(400);
        exit(json_encode(['message' => $error_message]));
    }
     //เก็บ id ของ cupinfo_id ไว้ใน  $cupId ก่อน
    if(!empty($data->cpuinfo_id)){
    $cupId = array();
    foreach($data->cpuinfo_id as $val){
        $cupId[] = $val->id;
    }    
    $values_cpu = implode(',',array_fill(0, count($cupId),'('.$stmt->insert_id.',?)')); //สร้างรูปแแบตัว (id,?) ตามขนาดข้อมูล
    $query_cpu = "INSERT INTO assets_has_cpuinfo (assets_id, cpuinfo_id) VALUES $values_cpu"; // ทดสอบคำสั่ง echo $query_cpu;
    $stmt_cpu   = mysqli_prepare($database, $query_cpu); 
    mysqli_stmt_bind_param($stmt_cpu, str_repeat('i', count($cupId)), ...$cupId);
    mysqli_stmt_execute($stmt_cpu);

        # ตรวจสอบว่า Insert Error หรือไม่
        $error_message = mysqli_error($database);
        if($error_message) 
        {
            mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
            http_response_code(400);
            exit(json_encode(['message' => $error_message]));
        }
    }
     //เก็บ id ของ storageinfo_id ไว้ใน $HddId ก่อน
     if(!empty($data->storageinfo_id)){
     $HddId = array();
     foreach($data->storageinfo_id as $val){
         $HddId[] = $val->id;
     }    
     $values_hdd = implode(',',array_fill(0, count($HddId),'('.$stmt->insert_id.',?)')); //สร้างรูปแแบตัว (id,?) ตามขนาดข้อมูล
     $query_hdd = "INSERT INTO assets_has_storageinfo (assets_id, storageinfo_id) VALUES $values_hdd";  // ทดสอบคำสั่ง echo $query_hdd;   
     $stmt_hdd   = mysqli_prepare($database, $query_hdd); 
     mysqli_stmt_bind_param($stmt_hdd, str_repeat('i', count($HddId)), ...$HddId);
     mysqli_stmt_execute($stmt_hdd);
     # ตรวจสอบว่า Insert Error หรือไม่
        $error_message = mysqli_error($database);
        if($error_message) 
        {
            mysqli_rollback($database); //กู้คืนคำสั่ง insert into ไม่ให้มีการบันทึกข้อมูล
            http_response_code(400);
            exit(json_encode(['message' => $error_message]));
        }
    }
    mysqli_commit($database);
    mysqli_close($database);

    echo json_encode(['message' => 'success']);
    
} else {
    http_response_code(400);
    exit(json_encode(['message' => 'The request is invalid']));
} //End if ตรวจสอบ Validation