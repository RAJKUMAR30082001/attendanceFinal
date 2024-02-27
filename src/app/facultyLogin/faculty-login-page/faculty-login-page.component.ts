import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/faculty.service';


@Component({
  selector: 'app-faculty-login-page',
  templateUrl: './faculty-login-page.component.html',
  styleUrls: ['./faculty-login-page.component.scss']
})
export class FacultyLoginPageComponent implements OnInit {
  email!:string;
  password!: string;
  errorMessage!:HTMLDivElement
  
  LoginForm!:FormGroup
  constructor(private service:FacultyService,private fb:FormBuilder,private render:Renderer2){}
  ngOnInit(): void {
    this.errorMessage=this.render.selectRootElement(".errorMessage")
    this.LoginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/)]
      ]
    })
  } 
  Login(){
    if (this.LoginForm.valid){
      let email:string=this.LoginForm.value.email
      let password:string=this.LoginForm.value.password
      this.service.loginCheck(email,password,this.errorMessage)
      this.LoginForm.reset()
    }
  }

}
