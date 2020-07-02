import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable, of, noop } from 'rxjs';
import { SendJobService, ILocation } from 'src/app/services/senjob.service';
import { switchMap} from 'rxjs/operators';
import { IComputer, IPosition, IDepartment } from 'src/app/authentication/components/computersupply/computersupply.interfaces';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { AlertService } from 'src/app/shareds/services/alert.service';

@Component({
  selector: 'app-sendjob',
  templateUrl: './sendjob.component.html',
  styleUrls: ['./sendjob.component.css']
})
export class SendjobComponent implements OnInit {

  searchLocation: string;
  searchDepartment: string;
  locations$:Observable<any>;
  department$:Observable<any>;
  errorMessage: string;
  computerSupply:IComputer[] = [];

  typeaheadSelectLocation:IPosition;
  typeaheadSelectDepartment:IDepartment;

  constructor(
    private builder:FormBuilder,
    private sendJopService:SendJobService,
    private alert:AlertService
  ) {
    this.initialCreateFormData();  
    
    //๒๒๒๒๒๒๒๒๒๒๒๒๒๒๒๒๒
    this.sendJopService.getItAssetByLoation("21")
   .then((res)=>{
     this.computerSupply = res;    
   })
   .catch(err=>{
    this.computerSupply = [];
    this.alert.someting_wrong(err.error.message);
    console.log(err.message);
   });
   }

  forms: FormGroup;

  ngOnInit() {

    //ดึงข้มูลสถานที่
    this.locations$ = new Observable((observer: any) => {
     observer.next(this.searchLocation);
    }).pipe(
      switchMap((query:string)=>{
        if(query) 
          return this.sendJopService.getLocation(query);    
        else 
          return of([]);    
      })
    );   

    //ดึงข้มูลสถานที่
    this.department$ = new Observable((observer: any) => {
      observer.next(this.searchDepartment);
     }).pipe(
       switchMap((query:string)=>{
         if(query) 
           return this.sendJopService.getDepartment(query);    
         else 
           return of([]);    
       })
     );   
  }

  locationOnSelect(e:TypeaheadMatch):void{
    this.typeaheadSelectLocation = e.item;
   this.sendJopService.getItAssetByLoation(e.item.id)
   .then((res)=>{
     this.computerSupply = res;    
   })
   .catch(err=>{
    this.computerSupply = [];
    this.alert.someting_wrong(err.error.message);
    console.log(err.message);
   });
  }
  departmentOnSelect(e:TypeaheadMatch):void{
    this.typeaheadSelectDepartment = e.item;
    this.sendJopService.getItAsset(e.item.id, this.typeaheadSelectLocation.id)
   .then((res)=>{
     this.computerSupply = res;     
   })
   .catch(err=>{
    this.computerSupply = [];
    this.alert.someting_wrong(err.error.message);
    console.log(err.message);
   });
  }

  onSubmit():void{
    //ถ้าไม่ได้กรอกข้อมูลมา
    if(!this.typeaheadSelectDepartment || !this.typeaheadSelectLocation) return this.alert.someting_wrong();
    //ถ้ากรอกข้อมูลมาครบ
    this.sendJopService.getItAsset(this.typeaheadSelectDepartment.id, this.typeaheadSelectLocation.id)
   .then((res)=>{
     this.computerSupply = res;   
   })
   .catch(err=>{
    this.computerSupply = [];
    this.alert.someting_wrong(err.error.message);
    console.log(err.message);
   });
  }

  onSenjob(id:any):void{
    console.log(id);    
  }

  initialCreateFormData():void{
    this.forms = this.builder.group({
      location:[],
      department:[]
    });
  }
}
