import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentRegisterComponent } from './StudentModules/student-register/student-register.component';
import { StudentFaceRegisterComponent } from './StudentModules/student-face-register/student-face-register.component';
import { StudentLoginComponent } from './StudentModules/student-login/student-login.component';
import { StudenthomepageComponent } from './studentHome/studenthomepage/studenthomepage.component';

const routes: Routes = [
  {path:'home',component:HomeComponent },
  {path:'studentRegister',component:StudentRegisterComponent},
  {path:"faceRegister",component:StudentFaceRegisterComponent},
  {path:"faceRegister/:registerNumber",component:StudentFaceRegisterComponent},
  {path:'login',component:StudentLoginComponent },
  {path:'studentHome',component:StudenthomepageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
