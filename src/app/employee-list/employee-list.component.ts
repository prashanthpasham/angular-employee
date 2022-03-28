import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employ } from '../model/Employ';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employs: Employ[] = [];
  isadmin = false;
  isuser = false;
  role!: string | null;
  empId:number=0;
  errorMsg:string='';
  searchTxt='';
  constructor(private employService: EmployeeService, private router: Router) {
     this.employService.message.subscribe(data=>{this.errorMsg =data;});
     setTimeout(()=>{
      this.employService.setMessage('');
     },3000)
    
  }
  getEmployees() {
    this.employService.getEmploysList().subscribe((data) => {
      this.employs = data;
      this.role = localStorage.getItem('SessionUserRole');
      if (localStorage.getItem('SessionUserRole') == 'admin') {
        this.isadmin = true;
      }
      if (localStorage.getItem('SessionUserRole') == 'user') {
        this.isuser = true;
      }
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  updateEmployee(id: number) {
    let obj={'id':id};
    this.router.navigate(['/display/update-employee', btoa(JSON.stringify(obj))]);
  }
  assignId(id:number){
    this.empId = id;
  }

  deleteEmployee() {
    this.employService.deleteEmploy(this.empId).subscribe((data) => {
      this.close();
      this.employService.setMessage('Employee Deleted Successfully!');
      setTimeout(()=>{
        this.employService.setMessage('');
       },3000);
      this.getEmployees();
    },(error)=>{
        this.errorMsg = error.error.message;
    });
  }
  close(){
    this.empId=0;
  }
}
