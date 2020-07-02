import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPosition, ILocation, IDepartment, IOsinfo, ICpuinfo, IStorageinfo, IRaminfo, IVgainfo, IDevice } from './computersupply.interfaces';
import { HttpService } from 'src/app/services/http.services';
import { AuthenService } from '../../services/authen.service';
import { BackendURL } from 'src/app/app.url';


@Injectable({
  providedIn: 'root'
})
export class ComputersupplyService {

  constructor(
    private http: HttpClient,
    private httpservice:HttpService,
    private authService:AuthenService
    ) { }

  private backendURL = BackendURL;

  getLocationInfo(name?:string){
    return this.http.get<ILocation[]>(this.backendURL+"/locationinfo",{params:{name}});    
  }
  getPositionInfo(name?:string){
    return this.http.get<IPosition[]>(this.backendURL+'/jobpositioninfo',{params:{name}});
  }
  getDepartmentInfo(name?:string){
    return this.http.get<IDepartment[]>(this.backendURL+'/departmentinfo',{params:{name}});
  }
  getOsInfo(name?:string){
    return this.http.get<IOsinfo[]>(this.backendURL+'/osinfo',{params:{name}});
  }
  getCPUInfo(name?:string){
    return this.http.get<ICpuinfo[]>(this.backendURL+'/cpuinfo',{params:{name}});
  }
  getHDDnfo(name?:string){
    return this.http.get<IStorageinfo[]>(this.backendURL+'/storageinfo',{params:{name}});
  }
  getRaminfo(name?:string){
    return this.http.get<IRaminfo[]>(this.backendURL+'/raminfo',{params:{name}});
  }
  getVgainfo(name?:string){
    return this.http.get<IVgainfo[]>(this.backendURL+'/vgainfo',{params:{name}});
  }
  async getDeviceinfo(type?:any){
    if(type)
    return await this.http.get<IDevice[]>(this.backendURL+'/deviceinfo',{params:{type}}).toPromise();  
    else 
    return await this.http.get<IDevice[]>(this.backendURL+'/deviceinfo').toPromise();
  }  
  async getPrinterinfo(){
    return await this.http.get<IDevice[]>(this.backendURL+'/printerinfo').toPromise();
  }  

  //จัดการข้อมูล
  postAssests(model:any){
    return this.httpservice.requestPost('/itassets',model,this.authService.getAuthenticated());    
  }
  updateAssets(model?:any){
    return this.httpservice.requestPut('/itassets',model,this.authService.getAuthenticated());  
  }
}

