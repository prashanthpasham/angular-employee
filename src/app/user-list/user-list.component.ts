import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Login } from '../model/Login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  usersList: Login[] =[];
  open: boolean = false;
  userId: number = 0;
  searchTxt:string='';
  constructor(private loginservice: LoginService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.loginservice.getUsersList().subscribe(
      (data) => {
        this.usersList = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openDialog(id: number) {
    this.userId = id;
    this.open = true;
  }
  closeDialog() {
    this.userId = 0;
    this.open = false;
  }
  onChangeRole() {
    let obj = { id: this.userId, role: 'admin' };
    this.loginservice.changeRole(JSON.stringify(obj)).subscribe(
      (data) => {
        if (data === 'success') {
          this.closeDialog();
          this.fetchUsers();
        } else {
          alert('Role Update Failed');
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      }
    );
  }
}
