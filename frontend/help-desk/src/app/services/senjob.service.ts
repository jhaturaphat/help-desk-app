import { Injectable } from "@angular/core";
import { BackendURL } from '../app.url';
import { HttpClient } from '@angular/common/http';
import { IComputer } from 'src/app/authentication/components/computersupply/computersupply.interfaces';
 
@Injectable({
    providedIn:'root'
})

export class SendJobService {

    public URL:any = BackendURL;    
    constructor (
        private _http:HttpClient
    ){}

    //ดึงข้อมูลสถานที่
    getLocation(search:string){
        return  this._http.get<ILocation>(this.URL+"/locationinfo",{params:{name:search}});
    }

    //ดึงข้อมูลแผนก
    getDepartment(search:string){
        return  this._http.get<ILocation>(this.URL+"/departmentinfo",{params:{name:search}});
    }
    async getItAsset(dep?:string, loca?:string){
        return await this._http.get<IComputer[]>(this.URL+"/itassets",{params:{location_id:loca, department:dep}}).toPromise() as IComputer[];
    } 
   async getItAssetByLoation(search?:string){
        return await this._http.get<IComputer[]>(this.URL+"/itassets",{params:{location_id:search}}).toPromise() as IComputer[];
   }
   
}

export interface ILocation{
    id:   any;
    name: string;
  }