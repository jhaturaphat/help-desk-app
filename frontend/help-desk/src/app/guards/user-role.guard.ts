import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs';
import { MemberService, IRoleMember } from '../services/member.service';
import { AuthenService } from '../authentication/services/authen.service';
import { AppURL } from 'src/app/app.url'
import { AlertService } from '../shareds/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private memberService:MemberService,
    private authen:AuthenService,
    private alert:AlertService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const roles:IRoleMember[] = next.data.roles; 
      this.memberService.getLogin(this.authen.getAuthenticated())
      .then((userLogin)=> { 
        if(roles.filter(item=> item == parseInt(IRoleMember[userLogin.premission])).length > 0)
          resolve(true);
        else
          this.alert.someting_wrong('ไม่สิทธิ์ใช้งานหน้านี้');
          resolve(false);
      })
      .catch(()=> {
        this.alert.someting_wrong();
        resolve(false);        
      }); 
    });
  }
  
}
