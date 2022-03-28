import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
 error:string|undefined;
 feedback={'emailId':'',
 'query':''};
 formGroup :FormGroup;
  constructor( private loginService: LoginService) { 
  
    this.formGroup = new FormGroup({
      EmailId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      Comments: new FormControl('', [
        Validators.required,
        //Validators.minLength(10),
        Validators.maxLength(250),
      ]),
    });
  }

  ngOnInit(): void {
   
  }
  submit(){
    this.error='';
  this.loginService.submitQuery(this.feedback).subscribe(data=>{
    this.error = data;
    this.feedback={'emailId':'','query':''};
    this.onReset();
  },error=>{
         this.error='Something went wrong,Pls try again!';
        console.log(error);
  });
  }
  onReset(){
    this.formGroup.reset();
  }

}
