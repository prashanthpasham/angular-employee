import { Component, OnInit } from '@angular/core';
import { Employ } from '../model/Employ';
import { EmployeeService } from '../services/employee.service';
import { Router,ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employ: Employ = new Employ();
  constructor(
    private employService: EmployeeService,
    private _route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
   this._route.params.subscribe(data=>{
     this.employService.getEmployById(JSON.parse(atob(data.id)).id).subscribe(data=>{
       this.employ = data;
     },error=>{
       console.log("error>>"+error);
     })
   });

  }

  onSubmit(f:NgForm) {
    this.employService.updateEmploy(this.employ.id,this.employ).subscribe(
      (data) => {
        console.log(data);
        if(data==='success'){
          this.employService.setMessage("Employee Updated Successfully!");
          this.goToEmployList();
        }else{
         this.employ.message=data;
        }
        
       },
      (error) =>{
        if (error instanceof HttpErrorResponse) 
          console.log(error.message);
          this.employService.setMessage("Employee Updated Failed!");
      }
    );
  }

  goToEmployList() {
    this.router.navigate(['/display/employs']);
  }

}
