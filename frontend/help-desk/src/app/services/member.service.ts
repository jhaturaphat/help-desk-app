import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BackendURL } from '../app.url';
import { AuthenService } from '../authentication/services/authen.service';
import { HttpService } from './http.services';


@Injectable({
    providedIn:'root'
})

export class MemberService{

    public URL:any = BackendURL;
    

    constructor(
        private _http:HttpClient,
        private authenService:AuthenService,
        private service:HttpService
    ){}

     // store user login ไว้
     public UserLogin: IMember = {} as any;
     public setUserLogin(userLogin: IMember) {
         this.UserLogin.id = userLogin.id;
         this.UserLogin.firstname = userLogin.firstname;
         this.UserLogin.lastname = userLogin.lastname;
         this.UserLogin.email = userLogin.email;
         this.UserLogin.premission = userLogin.premission;
         this.UserLogin.token = userLogin.token;
         this.UserLogin.remember = userLogin.remember;
         return this.UserLogin;   
     }

     public UserToken: IToken = {} as any;
     public setUserToken(userLogin: IToken) {        
        this.UserLogin.token = userLogin.token;
        this.UserLogin.remember = userLogin.remember;
        return this.UserLogin;   
    }

    
     async onRegister(model: IRegister){
        return await this._http.post(this.URL,model).toPromise();
    }

    async onLogin(model:ILogin){
        return await (this._http.post(this.URL+'/login',model).toPromise() as Promise<IToken>)
        .then(userLogin => {
            this.setUserToken(userLogin);
            this.authenService.setAuthenticated(userLogin.token);
        });
    }

    async getLogin(TOKEN:string){
        return await (this.service.requestGet('/login',TOKEN).toPromise() as Promise<IMember>)
        .then(userLogin => this.setUserLogin(userLogin));
    }

    

}

export interface IToken {
    token:string;
    remember:boolean;
}

export interface IMember{
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    premission:IRoleMember;
    token?:string;
    remember?:boolean;
}

export enum IRoleMember{     
    Member = 1,
    Administrator
}

export interface IRegister {
    fristname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    cpassword:string;
}

export interface ILogin{
    username:string;
    password:string;
}