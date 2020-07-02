import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from 'src/app/services/member.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { Router } from '@angular/router';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { AuthenService } from 'src/app/authentication/services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  AppUrl = AppURL;
  AuthURL= AuthURL;
  form:FormGroup;  

  constructor(
    private builder:FormBuilder,
    private member:MemberService,
    private alert:AlertService,
    private router:Router,
    private authenService:AuthenService
  ) {
    this.initialCreateFormData();
   }

  ngOnInit() {
    if(this.member.getLogin(this.authenService.getAuthenticated())){
      this.router.navigate(['/',AppURL.Authen]);
    }
  }

  initialCreateFormData(){    
    this.form = this.builder.group({
      username:['admin1',[Validators.required]],
      password:['123456', [Validators.required]],
      remember:[false]
    });
  }

  onSubmit(){
    if (this.form.invalid) 
     return this.alert.someting_wrong();
     
    this.member.onLogin(this.form.value)
    .then(()=>{
      this.alert.notify('เข้าสู่ระบบสำเร็จ', 'success');
      //this.authenService.setAuthenticated(result.token);
      console.log(this.member.UserLogin);
      
      this.router.navigate(['/',AppURL.Authen]);
    })
    .catch(err=>{      
      this.alert.someting_wrong(err.error.message);      
    })
  }

}
