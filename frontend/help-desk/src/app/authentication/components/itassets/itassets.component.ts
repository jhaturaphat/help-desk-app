import { Component, OnInit } from "@angular/core";
import { itassetsService } from "./itassets.service";
import { IItasset, IMemberSearchKey } from "./itassets.interface";
import { Router } from "@angular/router";
import { AppURL } from "src/app/app.url";
import { AuthURL } from "../../authentication.url";
import { AlertService } from "src/app/shareds/services/alert.service";

@Component({
  selector: "app-itassets",
  templateUrl: "./itassets.component.html",
  styleUrls: ["./itassets.component.css"],
})
export class ItassetsComponent implements OnInit {
  constructor(
    private itassetsService: itassetsService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.serachType = this.searchTypeItems[1];
  }

  itemsPerPage: number = 15;
  totalItems:number = 0;
  currentPage:number = 1;
  maxSize = 6;
  rotate = true;

  AppURL = AppURL;
  AuthURL = AuthURL;
  itasset: IItasset[] = [];

  // ตัวแปรสำหรับค้นหา
  searchText: string = '';
  serachType: IMemberSearchKey;
  searchTypeItems: IMemberSearchKey[] = [
      { key: 'id', value: 'ค้นหาจากรหัส' },
      { key: 'serial_number', value: 'ค้นหาจากซีเรียล' },
      { key: 'device_id', value: 'ค้นหาจากประเภท' },
      { key: 'location_id', value: 'ค้นหาจากสถานที่' },
      { key: 'department_id', value: 'ค้นหาจากหน่วยงาน' }
  ];

  ngOnInit() {
    this.getTotalItems(); 
    this.getItemsPerPage();
    
  }

  // ค้นหา
  public onSearchItem():void{
    console.log(this.serachType);
    
  }

  public getItemsPerPage(page:any = 0, itemsPerPage:any = this.itemsPerPage):void{
    this.itassetsService
      .getItassets(page, itemsPerPage)
      .then((result) => {
        this.itasset = result;     
      })
      .catch((err) => {
        this.alertService.notify(err.error);
      });
  }

  public getTotalItems():void{
    this.itassetsService.getTotalItems()
    .then((result:any) => {
        this.totalItems = result.totalItem;
    })
    .catch((err) => {
        this.alertService.notify(err.error);
      });
  }

  onEdit(item: any): void {
    this.router.navigate(
      ["", this.AppURL.Authen, this.AuthURL.Computersupply],
      { state: item }
    );
  }

  onDelete(item: any): void {
    this.alertService.confirm().then((status) => {  
      if (!status.value) return;

      this.itassetsService.deleteItem(item.id).subscribe(
        (result) => {
          this.ngOnInit();         
         this.alertService.Toast();
        },
        (err) => {
          this.alertService.someting_wrong();
          console.log(err);
        }
      );
    });
  }

//   pagination 
public pageChanged(event:any):void{       
    this.getItemsPerPage((event.page - 1)*this.itemsPerPage, this.itemsPerPage);    
}

}
