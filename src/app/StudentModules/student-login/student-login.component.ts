import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb:FormBuilder,private render:Renderer2,private service:StudentCouchService){}

  ngOnInit(): void {
    this.errorMessage=this.render.selectRootElement(".errorMessage")
    this.loginForm=this.fb.group({
      registerNumber:['',[Validators.required,Validators.minLength(10)]],
      password:["",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/)]]
    })
    
  }
  onSubmit(){
    const studentDetails:loginDetails={
      registerNumber:this.loginForm.value.registerNumber,
      password:this.loginForm.value.password
    }
   
    this.service.login(studentDetails,this.errorMessage)
  }
}
