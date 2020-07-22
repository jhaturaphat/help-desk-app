import { Component, OnInit } from "@angular/core";
import { itassetsService } from "./itassets.service";
import { IItasset } from "./itassets.interface";
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
  ) {}

  itemsPerPage: number = 15;
  totalItems:number = 0;
  currentPage:number = 1;
  maxSize = 6;
  rotate = true;

  AppURL = AppURL;
  AuthURL = AuthURL;
  itasset: IItasset[] = [];

  ngOnInit() {
    this.getTotalItems(); 
    this.getItemsPerPage();
    
  }

  public getItemsPerPage():void{
    this.itassetsService
      .getItassets(0, this.itemsPerPage)
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
      if (!status) return;
      this.itassetsService.deleteItem(item.id).subscribe(
        (result) => {
          this.ngOnInit();
          this.alertService.notify(result["message"], "success");
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
    console.log(event);    
}

}
