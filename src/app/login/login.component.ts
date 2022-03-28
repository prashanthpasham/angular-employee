import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Login } from '../model/Login';
import { AppComponent } from '../app.component';
import { LoginService } from '../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { matchValidator } from '../signup/password.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = new Login();

  formGroup!: FormGroup;
  // message: string;
  sto = false;
  user = '';
  isFormValid = true;
  dialog = false;
  emailId: string = '';
  isValid = false;
  id: number = 0;
  newpassword: string = '';
  fpGroup!: FormGroup;
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('constructor called!');
  }

  ngOnInit() {
    console.log('ngOnInit called!');
    this.loginService.message.subscribe((c) => {
      this.login.message = c;
    });
    this.resetError();
    this.formGroup = new FormGroup({
      EmailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      Password: new FormControl('', [
        Validators.required,
        //Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }
  resetError(){
    setTimeout(() => {
      this.loginService.setErrorMessage('');
    }, 5000);
  }

  onSubmit() {
    this.isFormValid = true;
    if (this.isFormValid) {
      this.loginService
        .getLoginDetails(this.login.emailId, this.login.password)
        .subscribe(
          (data) => {
            this.login = data;
            // console.log("Login");
            if (this.login.message === 'Login success') {
              localStorage.setItem('Token', data.token);
              localStorage.setItem('SessionUserId', this.login.id.toString());
              localStorage.setItem('SessionUserRole', this.login.role);
              localStorage.setItem('SessionUserName', this.login.username);
              console.log('Login2');
              if (this.login.role == 'admin' || this.login.role == 'user') {
                this.goToEmployList();
              } else {
                this.router.navigate(['/login']);
              }
            } else {
              this.onReset();
            }
          },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.statusText === 'Unknown Error') {
                alert('Server Unreachable,Please try later!');
              } else {
                console.log(error);
              }
              this.onReset();
            }
          }
        );
    }
  }

  goToEmployList() {
    this.router.navigate(['/display/employs']);
  }

  onReset() {
    this.formGroup.reset();
  }

  moveToRegister() {
    this.router.navigate(['../signup']);
  }
  openDialog() {
    this.fpGroup = new FormGroup({
      NewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        matchValidator('confirmNewPwd', true),
      ]),
      confirmNewPwd: new FormControl('', [
        Validators.required,
        matchValidator('NewPassword'),
      ]),
    });
    this.id = 0;
    this.emailId = '';
    this.isValid = false;
    this.dialog = true;
  }
  closeDialog() {
    this.dialog = false;
  }
  checkEmail(f: NgForm) {
    // alert(this.emailId);

    this.loginService.validateEmail(this.emailId).subscribe(
      (data) => {
        f.resetForm();
        let obj = JSON.parse(JSON.stringify(data));
        if (obj.message == 'success') {
          this.isValid = true;
          this.id = obj.id;
        } else {
          this.id = 0;
          this.isValid = false;
          alert("EmailId Not Found!");
        }
      },
      (error) => {
        this.isValid = false;
        console.log(error);
        alert('Something Went Wrong,Please try later');
      }
    );
  }
  onResetPwd() {
    let obj = { password: this.newpassword, id: this.id };
    this.loginService.resetPassword(obj).subscribe(
      (data) => {
        this.loginService.setErrorMessage(data==='success'?"Reset Password Successfully":"Reset Password Failed");
        this.dialog = false;
        this.fpGroup.reset();
        this.resetError();
      },
      (error) => {console.log(error)}
    );
  }
}
