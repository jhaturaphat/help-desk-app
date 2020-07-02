import { Component, OnInit } from '@angular/core';


declare const appJs:any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //ฟังก์ชันเรียนใช้เมนู
    appJs.menu_load_pages();
  }

}
