import { Component, OnInit } from '@angular/core';
import {Login} from '../model/Login';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {matchValidator} from './password.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  login: Login = new Login();

  formGroup!: FormGroup;
  constructor(private router:Router,private loginservice:LoginService) { 
    
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      EmailId: new FormControl('', [
        Validators.required,
         Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
        matchValidator('confirmPwd', true)
      ]),
      UserName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPwd:new FormControl('',[Validators.required,matchValidator('Password')]),
      //role:new FormControl('',[Validators.required])
    });
  }

  
  onReset() {
    this.formGroup.reset();
  }

  moveToLogin() {
    this.router.navigate(['../login']);
  }
  onSubmit(){
   this.loginservice.signup(this.login).subscribe(
     (data)=>{
        this.login = data;
        if(this.login.message=='Signup successfully')  {
          this.loginservice.setErrorMessage(this.login.message);
         this.moveToLogin();
        }else{
          this.onReset();
        }
     },
     error=>{
       console.log(error);
     }
   )
  }

}
