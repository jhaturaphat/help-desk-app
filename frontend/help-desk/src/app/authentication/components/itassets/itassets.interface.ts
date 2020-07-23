import { Type } from '@angular/core';

export interface IItasset {
    id: string;
    device_id: string;
    year: string;
    location_id: string;
    department_id: string;
    number: string;
    stock_id: string;
    serial_number: string;
    remark: string;
    member: string;
    fullname:string;
    job_position_id: string;
    job_position:string;
    raminfo_id: string;
    osinfo_id: string;
    vgainfo_id: string;
    vgainfo:string;
    vender: string;
    status: string;
    printer_id: string;
    deviceinfo: IDeviceinfo[];    
    location: string;
    department: string;
    firstname: string;
    raminfo: string;
    osinfo: string;
    storageinfo: Storageinfo[];
    cpuinfo: Cpuinfo[];
  }

  export interface IDeviceinfo {
    id:any;
    name:string;
    type:string;
  }
  
  export interface Cpuinfo {
    id: string;
    vender: string;
    model: string;
    cpu_core: string;
    clock_speed: string;
  }
  
  export interface Storageinfo {
    id: string;
    type: string;
    capacity: string;
  }

  export interface IMemberSearchKey {
    key: string;
    value: string;
}