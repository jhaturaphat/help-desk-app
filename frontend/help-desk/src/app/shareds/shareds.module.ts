import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule , ReactiveFormsModule} from '@angular/forms'

import { NavbarComponent } from "src/app/shareds/components/navbar/navbar.component";
import { SidebarComponent } from "src/app/shareds/components/sidebar/sidebar.component";
import { ContentComponent } from 'src/app/shareds/components/content/content.component';
//import { NavbarComponent } from "src/app/shareds/components/navbar/navbar.component"
import { RouterModule } from '@angular/router';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertService } from './services/alert.service';


@NgModule({    
  declarations: [
    NavbarComponent, 
    SidebarComponent, 
    ContentComponent    
  ],
  imports:[
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot()
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent, 
    SidebarComponent, 
    ContentComponent,
    TypeaheadModule,
    BsDropdownModule,
    PopoverModule
  ],
  providers: [
    AlertService
  ]
})
export class SharedsModule {}
