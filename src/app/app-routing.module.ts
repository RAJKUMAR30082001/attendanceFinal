import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentRegisterComponent } from './StudentModules/student-register/student-register.component';
import { StudentFaceRegisterComponent } from './StudentModules/student-face-register/student-face-register.component';
import { StudentLoginComponent } from './StudentModules/student-login/student-login.component';
import { StudenthomepageComponent } from './studentHome/studenthomepage/studenthomepage.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminService } from './admin.service';
import { FacultyRegisterComponent } from './facultyLogin/faculty-register/faculty-register.component';
import { FacultyLoginPageComponent } from './facultyLogin/faculty-login-page/faculty-login-page.component';
import { FacultyAdmitComponent } from './Admin/faculty-admit/faculty-admit.component';
import { FacultyHomeComponent } from './facultyHome/faculty-home/faculty-home.component';
import { PermitLeaveComponent } from './facultyHome/permit-leave/permit-leave.component';
import { UpdateAttendanceComponent } from './facultyHome/update-attendance/update-attendance.component';
import { PermitLetterComponent } from './studentHome/permit-letter/permit-letter.component';

const routes: Routes = [
  {path:'home',component:HomeComponent },
  {path:'studentRegister',component:StudentRegisterComponent},
  {path:"faceRegister",component:StudentFaceRegisterComponent},
  {path:"faceRegister/:registerNumber",component:StudentFaceRegisterComponent},
  {path:'login',component:StudentLoginComponent },
  {path:'studentHome',component:StudenthomepageComponent},
  {path:"adminHome",component:AdminHomeComponent,canActivate:[AdminService]},
  {path:"facultyLogin",component:FacultyLoginPageComponent},
  {path:"facultyRegister",component:FacultyRegisterComponent},
  {path:"facultyAdmit",component:FacultyAdmitComponent},
  {path:"facultyHome",component:FacultyHomeComponent},
  {path:"updateAttendance",component:UpdateAttendanceComponent},
  {path:"permitLeave",component:PermitLeaveComponent},
  {path:"permitLetter", component:PermitLetterComponent},


  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
