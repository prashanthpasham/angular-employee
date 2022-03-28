import { Component, OnInit } from '@angular/core';
import { Employ } from '../model/Employ';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employ: Employ = new Employ();
  constructor(
    private employService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.id=this.route.snapshot.params['id'];
    // this.employService.getEmployById(this.id).subscribe(data =>{
    // this.employ = data;
    // }, error => console.log(error));
  }

  onSubmit(f:NgForm) {
    this.employService.createEmploye(this.employ).subscribe(
      (data) => {
        this.employ.message = data.message;

        console.log(this.employ.message);

        if (this.employ.message == 'Employee created successfully') {
          this.employService.setMessage(this.employ.message);
          this.goToEmployList();
        }else  {
          f.resetForm();
        }
      },
      (error) => console.log(error)
    );
  }

  goToEmployList() {
    this.router.navigate(['/display/employs']);
  }
}
