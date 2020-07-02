
export interface IPosition {
    id:   any;
    name: string;
  }
  export interface IDepartment {
    id:   any;
    name: string;
  }
  export interface IDevice{
    id:   any;
    name: string;
    type:string;
  }
  export interface ILocation{
    id:   any;
    name: string;
  }
  export interface ICpuinfo{
    id:         any;
    vender:     string;
    model:      string;
    cup_core:   string;
    clock_speed:string;
    cpuinfo?:string;
  }

  export interface ICpuinfos {
    id: string;
    vender: string;
    model: string;
    cpu_core: string;
    clock_speed: string;
  }
  export interface IRaminfo{
    id:any;
    type:string;
    capacity:string;
    unit:string;
    raminfo?:string;
  }
  
  export interface IVgainfo{
    id:any;
    vender:string;
    model:string;
    type:string;
    capacity:string;
    unit:string;
  }

  export interface IOsinfo{
      id:any;
      vender:string;   
      os_ver:string;   
  }
  export interface IStorageinfo{
      id:any;
      type:string;
      capacity:string;
      hddinfo?:string;
  }

  export interface IComputer{
    number:         string;
    stock_id:       string;
    serial_number:  string;
    remark?:        string;
    location_id:    string;
    device_id:      string;
    member:        string;
    year_id:        string;
    job_position_id:string;
    department_id:  string;
    raminfo_id:     string;
    osinfo_id:      string;
    vgainfo_id:     string;
    vender:         string;
    status?:        string;
    storageinfo_id?:IStorageinfo[];
    cpuinfo_id?:    ICpuinfo[];
  }
  