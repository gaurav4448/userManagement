import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGaurdService } from './services/auth-gaurd.service';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  {path: "posts", component: UsersComponent, canActivate: [AuthGaurdService]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
