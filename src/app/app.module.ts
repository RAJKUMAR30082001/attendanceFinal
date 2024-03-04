import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentRegisterComponent } from './StudentModules/student-register/student-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentLoginComponent } from './StudentModules/student-login/student-login.component';
import { StudentFaceRegisterComponent } from './StudentModules/student-face-register/student-face-register.component';
import { StudenthomepageComponent } from './studentHome/studenthomepage/studenthomepage.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { FacultyRegisterComponent } from './facultyLogin/faculty-register/faculty-register.component';
import { FacultyLoginPageComponent } from './facultyLogin/faculty-login-page/faculty-login-page.component';
import { FacultyAdmitComponent } from './Admin/faculty-admit/faculty-admit.component';
import { PermitLeaveComponent } from './facultyHome/permit-leave/permit-leave.component';
import { FacultyHomeComponent } from './facultyHome/faculty-home/faculty-home.component';
import { UpdateAttendanceComponent } from './facultyHome/update-attendance/update-attendance.component';
import { PermitLetterComponent } from './studentHome/permit-letter/permit-letter.component';
import { SchedulePeriodComponent } from './Admin/schedule-period/schedule-period.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    StudentFaceRegisterComponent,
    StudenthomepageComponent,
    AdminHomeComponent,
    FacultyRegisterComponent,
    FacultyLoginPageComponent,
    FacultyAdmitComponent,
    PermitLeaveComponent,
    FacultyHomeComponent,
    UpdateAttendanceComponent,
    PermitLetterComponent,
    SchedulePeriodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
