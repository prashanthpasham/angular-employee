import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
   customer={
     id:101,
     name:'prashanth',
     address:'Hyd'
   }
   ht=100;
   wt=200;
   showCustomer:boolean = false;
   addCustomer(){
     alert("addCustomer called!");
   }
   show(){
     this.showCustomer=!this.showCustomer;
   }
   testOp(event:any){
     alert(event);
   }
}
