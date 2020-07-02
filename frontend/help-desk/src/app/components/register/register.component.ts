import { Component, OnInit } from "@angular/core";
import { AppURL } from "src/app/app.url";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { AlertService } from "src/app/shareds/services/alert.service";
import { AccountService } from "src/app/shareds/services/account.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private account: AccountService,
    private alert: AlertService,
    private router:Router
  ) {
    this.initalCreateFormData();
  }

  AppUrl = AppURL;
  form: FormGroup;

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) 
     return this.alert.someting_wrong();
    this.account
      .onRegister(this.form.value)
      .then((result:any) => {
        this.alert.notify(result.message,'success');
        this.form.reset();
        this.router.navigate(['/',AppURL.Login]);
      })
      .catch(err=>{
        this.alert.someting_wrong(err.error.message);
        console.log(err);        
      });
  }

  private initalCreateFormData() {
    this.form = this.builder.group({
      firstname: ["ทดสอบ", [Validators.required]],
      lastname: ["โปรแกรม", [Validators.required]],
      email: ["mail@mail.com", [Validators.required, Validators.email]],
      username: ["admin", [Validators.required]],
      password: [
        "123456",
        [Validators.required, Validators.pattern(/^[A-z0-9]{6,15}$/)],
      ],
      cpassword: ["123456", [Validators.required, this.comparePassword("password")]],
    });
  }
  // สร้าง validate เอง
  private comparePassword(passwordField: string) {
    return function (confirm_password: AbstractControl) {
      if (!confirm_password.parent) return;
      const password = confirm_password.parent.get(passwordField);
      const passwordSubscripe = password.valueChanges.subscribe(() => {
        confirm_password.updateValueAndValidity();
        passwordSubscripe.unsubscribe();
      });
      if (confirm_password.value === password.value) return;
      return { compare: true };
    };
  }
}
