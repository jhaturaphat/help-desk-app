<?php

$sql = "SELECT
	assets.*,	
	location.NAME AS location,
	department.NAME AS department,
  job_position.name AS job_position,    
    CONCAT( raminfo.type, ' ', raminfo.capacity, ' ', raminfo.unit ) AS raminfo,
    CONCAT( osinfo.vender, ' ', osinfo.os_ver ) AS osinfo ,
    CONCAT(vgainfo.vender, ' ', vgainfo.model, ' ',vgainfo.type,' ',vgainfo.capacity, vgainfo.unit) AS vgainfo
FROM
	assets
	LEFT JOIN deviceinfo ON assets.device_id = deviceinfo.id
	LEFT JOIN location ON assets.location_id = location.id
	LEFT JOIN department ON assets.department_id = department.id
	LEFT JOIN raminfo ON assets.raminfo_id = raminfo.id
	LEFT JOIN osinfo ON assets.osinfo_id = osinfo.id
	LEFT JOIN vgainfo ON assets.vgainfo_id = vgainfo.id  
  LEFT JOIN job_position ON assets.job_position_id = job_position.id";

if (isset($_GET['id'])) { //ถ้าส่ง ID มา
  $sql .= 	" WHERE assets.id =".$_GET['id'];
}else if(isset($_GET['location_id'])){  //ถ้าส่ง location_id มา
  
  $sql .= 	" WHERE assets.location_id =".$_GET['location_id'];  
}else if(isset($_GET['location_id']) && isset($_GET['department_id'])){
  $sql .= 	" WHERE assets.location_id = ".$_GET['location_id']." AND assets.department_id = ".$_GET['department_id'];  
}



$json = [];
$query = mysqli_query($database, $sql);
$result = mysqli_fetch_all($query, MYSQLI_ASSOC);

if ($result) {
    foreach ($result as $index => $item) {
        
        $sql = "SELECT storageinfo.id , storageinfo.type, storageinfo.capacity  
        FROM assets_has_storageinfo AS ahs
        INNER JOIN storageinfo ON ahs.storageinfo_id = storageinfo.id AND ahs.assets_id = " . $item['id'];
        $query = mysqli_query($database, $sql);
        $storageinfo["storageinfo"] = mysqli_fetch_all($query, MYSQLI_ASSOC);

        $sql = "SELECT cpuinfo.id, cpuinfo.vender, cpuinfo.model, cpuinfo.cpu_core, cpuinfo.clock_speed
        FROM assets_has_cpuinfo AS cpu 
        INNER JOIN cpuinfo ON cpu.cpuinfo_id = cpuinfo.id AND cpu.assets_id =" . $item['id'];
        $query = mysqli_query($database, $sql);
        $cpuinfo["cpuinfo"] = mysqli_fetch_all($query, MYSQLI_ASSOC);          

        $sql = "SELECT * FROM deviceinfo WHERE id=".$item['device_id'];
        $query = mysqli_query($database,$sql);
        $deviceinfo['deviceinfo'] = mysqli_fetch_all($query, MYSQLI_ASSOC);

        //สร้างรูปแบบข้อมูล JSON DATA
        $json[] = array_merge($result[$index], $deviceinfo, $storageinfo, $cpuinfo);

    }    
    echo json_encode($json);
}else{     
    http_response_code(404);
    exit(json_encode(["message"=>"ไม่พบข้อมูล"])); 
}




/*
//ผลลัพธ์
[
  {
    "id": "1",
    "device_id": "02",
    "year": "63",
    "location_id": "34",
    "department_id": "5100",
    "number": "4",
    "stock_id": "none",
    "serial_number": "PC17AETJ",
    "remark": "เปลี่ยนทดแทนเครื่อง เก่า วันที่ 5/2/63",
    "user_id": "1",
    "job_position_id": "1",
    "raminfo_id": "3",
    "osinfo_id": "19",
    "vgainfo_id": "1",
    "vender": "ผู้ผลิต หรือ รุ่นสินค้า",
    "status": "1",
    "printer_id": "0",
    "deviceinfo": [
      {
        "id": "02",
        "name": "PC Desktop",
        "type": "1"
      }
    ],
    "location": "อาคาร3ชั้น4",
    "department": "IPD กุมารเวกรรม",
    "job_position": "พยาบาลวิชาชีพ",
    "fullname": "รัตนา รากทอง",
    "raminfo": "DDR 4 8 GB",
    "osinfo": "microsort Windows 10 Ver.1903",
    "vgainfo": "Intel Integrated Onboard Share-",
    "storageinfo": [
      {
        "id": "33",
        "type": "SSD",
        "capacity": "1024 GB"
      },
      {
        "id": "34",
        "type": "SSD",
        "capacity": "120 GB"
      }
    ],
    "cpuinfo": [
      {
        "id": "24",
        "vender": "Intel",
        "model": "Corei5 9400",
        "cpu_core": "6/6",
        "clock_speed": "2.90 GHz"
      }
    ]
  },
]
*/
