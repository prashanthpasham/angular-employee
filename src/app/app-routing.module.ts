import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DisplayComponent } from './display/display.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { AuthGuard } from './auth.guard';
import { HomeViewComponent } from './home-view/home-view.component';
import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  {
    path: 'display',
    component: DisplayComponent,
    children: [
      { path: 'employs', component: EmployeeListComponent },
      { path: 'create-employee', component: CreateEmployeeComponent },
      { path: 'update-employee/:id', component: UpdateEmployeeComponent },
      { path: 'user-list', component: UserListComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
