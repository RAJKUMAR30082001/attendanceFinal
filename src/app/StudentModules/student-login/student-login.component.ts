import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { StudentCouchService } from 'src/app/student-couch.service';
import { loginDetails } from 'src/app/student-data';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {
  loginForm!:FormGroup
  errorMessage!:HTMLDivElement
  year:number=new Date().getFullYear()
  isLog!:boolean
  constructor(private fb:FormBuilder,private render:Renderer2,private service:StudentCouchService,private route:Router,private admin:AdminService){}

  ngOnInit(): void {
    this.errorMessage=this.render.selectRootElement(".errorMessage")
    this.loginForm=this.fb.group({
      registerNumber:['',[Validators.required]],
      password:["",[Validators.required]]
    })
    
  }
 
  async onSubmit(){
    const studentDetails:loginDetails={
      registerNumber:this.loginForm.value.registerNumber,
      password:this.loginForm.value.password
    }
    this.isLog=await(this.admin.checkAdmin(studentDetails.password,studentDetails.registerNumber))
    if(this.isLog){
      this.admin.setValue(this.isLog)
      this.route.navigate(['/adminHome']);
    }
    else
    this.service.login(studentDetails,this.errorMessage)
  }
}
