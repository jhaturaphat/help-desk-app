import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from 'src/app/authentication/authentication.url';
import { MemberService, IRoleMember, IMember } from 'src/app/services/member.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private memberService:MemberService
  ) { }

  AppURL = AppURL;
  AuthURL= AuthURL;

  Member = <IMember> {};
  Roles = IRoleMember;

  ngOnInit() {
    this.Member = this.memberService.UserLogin;   
    console.log(this.Member);
      
    if(this.Member.premission == this.Roles['1'])   {
      console.log(this.Member);
      
    }
  }

}
