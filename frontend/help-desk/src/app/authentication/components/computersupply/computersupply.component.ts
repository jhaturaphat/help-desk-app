import { Component, OnInit } from "@angular/core";

import { Observable, from, of } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TypeaheadMatch, TypeaheadConfig } from "ngx-bootstrap/typeahead";
import { ComputersupplyService } from "./computersupply.service";
import {
  IPosition,
  IDepartment,
  ILocation,
  IOsinfo,
  ICpuinfo,
  IStorageinfo,
  IRaminfo,
  IVgainfo,
  IDevice,
  ICpuinfos,
} from "./computersupply.interfaces";
import { Router } from "@angular/router";
import { IItasset } from "../itassets/itassets.interface";
import { AlertService } from "src/app/shareds/services/alert.service";
import { MemberService } from 'src/app/services/member.service';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { switchMap } from 'rxjs/operators';

// such override allows to keep some initial values
export function getTypeaheadConfig(): TypeaheadConfig {
  return Object.assign(new TypeaheadConfig(), {
    hideResultsOnBlur: true,
    typeaheadHideResultsOnBlur: false,
    typeaheadAsync: true,
    typeaheadMinLength: 0,
  });
}


@Component({
  selector: "app-computersupply",
  templateUrl: "./computersupply.component.html",
  styleUrls: ["./computersupply.component.css"],
  providers: [{ provide: TypeaheadConfig, useFactory: getTypeaheadConfig }],
})
export class ComputersupplyComponent implements OnInit {
  
  public buttonSubmit: boolean = true;
  public assetsItems: IItasset;

  public deviceIsSelect: boolean = true;
  public printerIsSelected: boolean = true;

  public locationSelected: string = "";
  public positionSelected: string = "";
  public departmentSelected: string = "";
  public osSelected: string = "";
  public cpuSelected: string = "";
  public hddSelected: string = "";
  public ramSelected: string = "";
  public vgaSelected: string = "";

  public location: Observable<ILocation[]>;
  public position: Observable<IPosition[]>;
  public department: Observable<IDepartment[]>;
  public os: Observable<IOsinfo[]>;
  public cpu: Observable<ICpuinfo[]>;
  public hdd: Observable<IStorageinfo[]>;
  public ram: Observable<IRaminfo[]>;
  public vga: Observable<IVgainfo[]>;

  public deviceType: IDevice[] = [];
  public printerType: IDevice[] = [];
  public cpuList: ICpuinfos[] = [];
  public hddList: IStorageinfo[] = [];
  
  forms: FormGroup;

  constructor(
    private comservice: ComputersupplyService,
    private builder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private memberService:MemberService
  ) {

    //รับค่าตัวแปรจาก Component อื่น
    this.assetsItems = this.router.getCurrentNavigation().extras.state as IItasset;
    console.log(this.assetsItems);
    
    this.initialCreateFormData();        
  }

 

  private initialCreateFormData() {    
    this.forms = this.builder.group({
      deviceinfo:[''],
      year:[''],
      location_id:[''],
      location:[''],
      number:[''],
      stock_id:[''],
      serial_number:[''],
      remark:[''],
      member: [''],
      user:[''],
      job_position_id:[''],
      job_position:[''],
      department_id:[''],
      department:[''],
      raminfo_id:[''],
      raminfo:[''],
      osinfo_id:[''],
      osinfo:[''],
      vgainfo_id:[''],
      vgainfo:[''],
      vender:[''],
      status:[''],
      storageinfo_id:[''],
      storageinfo:[''],
      cpuinfo_id:[''],
      cpuinfo:[''],
      printer_id:['']
    });
  }

  // แก้ไขฟอร์ม
   private async initialUpdateFormData(){    
    if (this.assetsItems) {      
      this.buttonSubmit = false;      
      let idx = this.deviceType.findIndex(item=>{
        return this.assetsItems.deviceinfo[0].id === item.id;
      });
      
      this.forms.controls["deviceinfo"].setValue(this.deviceType[idx]);
      //this.deviceSelected(this.assetsItems.deviceinfo[0]);
      this.forms.controls["year"].setValue(this.assetsItems.year);
      this.forms.controls["location_id"].setValue(this.assetsItems.location_id);
      //this.forms.controls['location'].setValue(this.assetsItems.location);
      this.forms.controls["number"].setValue(this.assetsItems.number);
      this.forms.controls["stock_id"].setValue(this.assetsItems.stock_id);
      this.forms.controls["serial_number"].setValue(this.assetsItems.serial_number);
      this.forms.controls["remark"].setValue(this.assetsItems.remark);
      this.forms.controls["member"].setValue(this.assetsItems.member); //fullname
      this.forms.controls["job_position_id"].setValue(
        this.assetsItems.job_position_id
      );
      // this.form.controls['job_position'].setValue(this.assetsItems.job_position);
      this.forms.controls["job_position_id"].setValue(
        this.assetsItems.job_position_id
      );
      this.forms.controls["department_id"].setValue(
        this.assetsItems.department_id
      );
      //this.form.controls['department'].setValue(this.assetsItems.department);
      this.forms.controls["raminfo_id"].setValue(this.assetsItems.raminfo_id);

      this.forms.controls["osinfo_id"].setValue(this.assetsItems.osinfo_id);
      this.forms.controls["osinfo"].setValue(this.assetsItems.osinfo);
      this.forms.controls["vgainfo_id"].setValue(this.assetsItems.vgainfo_id);
      this.forms.controls["vgainfo"].setValue(this.assetsItems.vgainfo);
      this.forms.controls["vender"].setValue(this.assetsItems.vender);      
      this.forms.controls["printer_id"].setValue(this.assetsItems.printer_id);      
      

      this.locationSelected = this.assetsItems.location;
      this.positionSelected = this.assetsItems.job_position;
      this.departmentSelected = this.assetsItems.department;
      this.osSelected = this.assetsItems.osinfo;
      this.cpuList = this.assetsItems.cpuinfo;
      this.hddList = this.assetsItems.storageinfo;
      this.ramSelected = this.assetsItems.raminfo;
      this.vgaSelected = this.assetsItems.vgainfo;

      this.forms.controls["cpuinfo_id"].setValue(this.cpuList);
      this.forms.controls["storageinfo_id"].setValue(this.hddList);      
    }
  }

  public onSubmit() {        
    if (this.assetsItems && !this.buttonSubmit) {       
      let data = this.forms.value;  //เพิ่มค่าตัวแปร id ให้ form data
      data["id"] = this.assetsItems.id;
      this.comservice.updateAssets(data).subscribe(
        (result:any) => {  
          this.alertService.notify(result.message,'success');
          this.router.navigate(['/',AppURL.Authen, AuthURL.Itassets]);
                    
        },
        (err) => {
          this.alertService.someting_wrong(err.Message);
          console.log(err);
        }
      );
    } else {
      //เพิ่มข้อมูลใหม่
      this.comservice.postAssests(this.forms.value).subscribe(
        (result:any) => {
          this.alertService.notify(result.message,'success');
          console.log('Create Assets');
          this.router.navigate(['/',AppURL.Authen, AuthURL.Itassets]); 
        },
        (err) => {
          this.alertService.someting_wrong(err.Message);
          console.log(err);
        }
      );
    }
  }

  public deviceSelected(event: any) {
           // console.log(event);
     if (event.type == '2') {
      this.printerIsSelected = false;
    } else {
      this.printerIsSelected = true;
    }
    // ควบคุม รายละเอียดทางเทคนิค
    if (event.type == '1') {
      this.deviceIsSelect = false;      
    } else {
      this.deviceIsSelect = true;
    }
    //ถ้าไม่ใช่การ แก้ไขข้อมูลให้ล้างค่าในฟร์อมค่านี้ต้องมาจากการคลิ๊กแก้ไขข้อมูล
    if (!this.assetsItems) {      
      this.clearForm();
    }
  }

  ngOnInit(): void {

    if(this.assetsItems) this.getItemsDeviceType(this.assetsItems.deviceinfo[0].type);
    else this.getItemsDeviceType();    
    this.getItemsPrinterType();   
      setTimeout(()=> {
        this.initialUpdateFormData();  //อัพเเดทข้อมูลใส่ฟอร์มหลังจาก 2 วินาที
      },300); 

    // ดึงข้อมูลสถานที่
    this.location = Observable.create((observer: any) => {      
        observer.next(this.locationSelected);
    }).pipe(
      switchMap((query:string)=>{
        if(query) {
          return this.comservice.getLocationInfo(query);
        }else{
          return of([]);
        }
      })
    );

    //ดึงข้อมูลตำแหน่งงาน
    this.position = new Observable((observer: any) => {
      observer.next(this.positionSelected);
    }).pipe(      
        switchMap((query:string)=>{
          if(query) {
            return this.comservice.getPositionInfo(query);
          }else{
            return of([]);
          }
        })      
    );
    
    // ดึงข้อมูลหน่วยงาน
    this.department = new Observable((observer: any) => {
      observer.next(this.departmentSelected);
    }).pipe(      
        switchMap((query:string)=>{
          if(query) {
            return this.comservice.getDepartmentInfo(query);
          }else{
            return of([]);
          }
        })      
    );

    // ดึงข้อมูล OS
    this.os = new Observable((observer: any) => {
      observer.next(this.osSelected);
    }).pipe(      
        switchMap((query:string)=>{
          if(query) {
            return this.comservice.getOsInfo(query);
          }else{
            return of([]);
          }
        })      
    );
    // ดึงข้อมูล cpu
    this.cpu = new Observable((observer: any) => {
      observer.next(this.cpuSelected);
    }).pipe(      
      switchMap((query:string)=>{
        if(query) {
          return this.comservice.getCPUInfo(query);
        }else{
          return of([]);
        }
      })      
  );
    // ดึงข้อมูล hdd
    this.hdd = new Observable((observer: any) => {
      observer.next(this.hddSelected);
    }).pipe(      
      switchMap((query:string)=>{
        if(query) {
          return this.comservice.getHDDnfo(query);
        }else{
          return of([]);
        }
      })      
  );
    // ดึงข้อมูล ram
    this.ram = new Observable((observer: any) => {
      observer.next(this.ramSelected);
    }).pipe(      
      switchMap((query:string)=>{
        if(query) {
          return this.comservice.getRaminfo(query);
        }else{
          return of([]);
        }
      })      
  );
    // ดึงข้อมูล VGA
    this.vga = new Observable((observer: any) => {
      observer.next(this.vgaSelected);
    }).pipe(      
      switchMap((query:string)=>{
        if(query) {
          return this.comservice.getVgainfo(query);
        }else{
          return of([]);
        }
      })      
  );
  }

  private getItemsDeviceType(type?:any) {
    //ดึงข้อมูล Device ประเภทอุปกรณ์
    this.comservice
      .getDeviceinfo(type)
      .then((result) => {
        this.deviceType = result;   
        //console.log(this.deviceType);                        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  public async getItemsPrinterType() {
    //ดึงข้อมูล ประเภทปริ้นเตอร์
    this.comservice
      .getPrinterinfo()
      .then((result) => {
        this.printerType = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //เหตุการณ์ตอนเลือกข้อมูล
  public locationTypeaheadOnSelect(e: TypeaheadMatch): void {
    //console.log(e);
    this.forms.controls["location_id"].setValue(e.item.id);
  }
  public positionTypeaheadOnSelect(e: TypeaheadMatch): void {
    //console.log(e);
    this.forms.controls["job_position_id"].setValue(e.item.id);
  }
  public departmentTypeaheadOnSelect(e: TypeaheadMatch) {
    //console.log(e);
    this.forms.controls["department_id"].setValue(e.item.id);
  }

  public osTypeaheadOnSelect(e: TypeaheadMatch) {
    //console.log(e);
    this.forms.controls["osinfo_id"].setValue(e.item.id);
  }
  public cpuTypeaheadOnSelect(e: TypeaheadMatch) {
    //console.log(e);
    this.forms.controls["cpuinfo"].setValue("");
    this.cpuList.push(e.item);
    this.forms.controls["cpuinfo_id"].setValue(this.cpuList);
  }
  public hddTypeaheadOnSelect(e: TypeaheadMatch) {
    //console.log(this.hddList);
    this.forms.controls["storageinfo"].setValue("");
    this.hddList.push(e.item);
    this.forms.controls["storageinfo_id"].setValue(this.hddList);
  }
  public ramTypeaheadOnSelect(e: TypeaheadMatch) {
    //console.log(e);
    this.forms.controls["raminfo_id"].setValue(e.item.id);
  }
  public vgaTypeaheadOnSelect(e: TypeaheadMatch) {
    //console.log(e);
    this.forms.controls["vgainfo_id"].setValue(e.item.id);
  }

  public onCpuDelete(index: number) {
    //console.log(index);
    this.cpuList.splice(index, 1);
    console.log(this.cpuList);    
  }

  public onHddDelete(index: number) {
    console.log(index);
    this.hddList.splice(index, 1);
    console.log(this.hddList);
    
  }

  public clearForm(): void {
    console.log('clear form');
    this.cpuList = [];
    this.hddList = [];
    //this.form.controls['device_id'].setValue('');
    this.forms.controls["year"].setValue("");
    //this.form.controls['location_id'].setValue('');
    //this.form.controls['location'].setValue('');
    this.forms.controls["number"].setValue("");
    this.forms.controls["stock_id"].setValue("");
    this.forms.controls["serial_number"].setValue("");
    this.forms.controls["remark"].setValue("");
    //this.form.controls['member'].setValue('');
    //this.form.controls['job_position_id'].setValue('');
    //this.form.controls['job_position'].setValue('');
    //this.form.controls['department_id'].setValue('');
    //this.form.controls['department'].setValue('');
    this.forms.controls["raminfo_id"].setValue("");
    this.forms.controls["raminfo"].setValue("");
    this.forms.controls["osinfo_id"].setValue("");
    this.forms.controls["osinfo"].setValue("");
    this.forms.controls["vgainfo_id"].setValue("");
    this.forms.controls["vgainfo"].setValue("");
    this.forms.controls["vender"].setValue("");
    this.forms.controls["storageinfo_id"].setValue("");
    this.forms.controls["storageinfo"].setValue("");
    this.forms.controls["cpuinfo_id"].setValue("");
    this.forms.controls["cpuinfo"].setValue("");
    this.forms.controls["printer_id"].setValue("");
  }
} //End
