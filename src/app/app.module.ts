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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    StudentFaceRegisterComponent,
    StudenthomepageComponent
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
