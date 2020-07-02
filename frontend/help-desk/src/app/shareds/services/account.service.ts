import { Injectable } from "@angular/core";
import { IRegister } from "src/app/services/member.service";
import { HttpClient } from "@angular/common/http";
import { BackendURL } from "src/app/app.url";

@Injectable({
    providedIn:'root'
})
export class AccountService {
  constructor(private _http: HttpClient) {}

  Url = BackendURL;

  //ลงทะเบียน
  async onRegister(models: IRegister) {       
    return await this._http.post<IRegister[]>(this.Url + "/register", models).toPromise();    
  }
}
