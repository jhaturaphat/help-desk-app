import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/authentication/services/authen.service';
import { AlertService } from '../../services/alert.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authen: AuthenService,
    private alert: AlertService,
    private memberServie:MemberService
) { }

ngOnInit() {
}

AppURL = AppURL;
AuthURL = AuthURL;

// ออกจากระบบ
onLogout() {
    this.alert.notify('ออกจากระบบสำเร็จ', 'info');
    this.memberServie.UserLogin = {} as any;
    this.authen.clearAuthenticated();
    this.router.navigate(['/', AppURL.Login]);    
}

}
