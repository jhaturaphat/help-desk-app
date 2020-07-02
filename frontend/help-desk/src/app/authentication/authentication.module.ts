import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { SharedsModule } from '../shareds/shareds.module';
import { ComputersupplyComponent } from './components/computersupply/computersupply.component';

import { AuthenService } from './services/authen.service'
import { ItassetsComponent } from './components/itassets/itassets.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ComputersupplyComponent,
    ItassetsComponent,
   
  ],
  imports: [
    CommonModule,
    SharedsModule,
    AuthenticationRoutingModule
  ],  
  providers: [
    AuthenService
  ]
})
export class AuthenticationModule { }
