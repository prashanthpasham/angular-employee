import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../model/Login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
   isadmin=false;
   isuser=false;
   role!:string|null;
   loginUser!:string|null;
  constructor(private router:Router,private loginservice:LoginService) { }

  ngOnInit(): void {
    this.loginUser = localStorage.getItem('SessionUserName');
     this.fetchPageDetails();
  }
  fetchPageDetails(){
    this.role = localStorage.getItem('SessionUserRole');
    if(localStorage.getItem('SessionUserRole')==='admin')
    {
      this.isadmin = true;
    }
    if(localStorage.getItem('SessionUserRole')==='user'){
      this.isuser=true;
    }
  }
  logout(){
    let login = new Login();
    let element = localStorage.getItem('SessionUserId');
    if(element!=null){
    login.id = parseInt(element.toString());
    this.loginservice.logoutById(login).subscribe(data=>{
      localStorage.removeItem('Token');
      localStorage.removeItem('SessionUserId');
      localStorage.removeItem('SessionUserRole');
      localStorage.removeItem('SessionUserName');
       this.router.navigate(['login']);
    },error=>{
      console.log(error);
    });
    }else{
      this.router.navigate(['login']);
    }
  }

}
