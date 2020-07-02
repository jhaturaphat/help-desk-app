import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { IItasset } from './itassets.interface';
import {BackendURL} from 'src/app/app.url';
import { AuthenService } from '../../services/authen.service';
import { HttpService } from 'src/app/services/http.services';



@Injectable({
    providedIn: 'root'
})

export class itassetsService{
    constructor(
        private http: HttpClient,
        private httpService:HttpService,
        private authService:AuthenService
        ) { }

    private backendURL = BackendURL;

    async getItassets(){
        return await this.http.get(this.backendURL+"/itassets").toPromise() as Promise<IItasset[]>;    
    }
    getItasset(id?:string){
        return this.http.get<IItasset[]>(this.backendURL+"/itassets",{params:{id}});    
    }

    deleteItem(id:any){        
        return this.httpService.requestDelete('/itassets',id,this.authService.getAuthenticated());
    }
}
