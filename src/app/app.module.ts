import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HlightDirective } from './directive/hlight.directive';
import { SortPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { AnnualsalaryPipe } from './pipes/annualsalary.pipe';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginService } from './services/login.service';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DisplayComponent } from './display/display.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserListComponent } from './user-list/user-list.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HlightDirective,
    SortPipe,
    FilterPipe,
    ReversePipe,
    AnnualsalaryPipe,
    ArrayFilterPipe,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    AboutComponent,
    DisplayComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    HomeViewComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule,ReactiveFormsModule, 
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [LoginService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
