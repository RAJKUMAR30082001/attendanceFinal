import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/faculty.service';
import { facultyLogin } from 'src/app/student-data';


@Component({
  selector: 'app-faculty-register',
  templateUrl: './faculty-register.component.html',
  styleUrls: ['./faculty-register.component.scss']
})
export class FacultyRegisterComponent implements OnInit {
  private facultyDetails!:facultyLogin
  facultyForm!:FormGroup
  errorMessage!:HTMLDivElement

  constructor(private facultyService:FacultyService,private fb:FormBuilder,private render:Renderer2){}

  ngOnInit(): void {
    this.errorMessage=this.render.selectRootElement(".errorMessage")
    this.facultyForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email:['',[Validators.required,Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/)]
      ],
      subject:["",[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
      subjectCode:['',[Validators.required]],
      department:["",[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]]
    })
  }
  onSubmit(){
    console.log("onsubmit")
    if (this.facultyForm.valid){
      this.facultyDetails={
        name:this.facultyForm.value.name?this.facultyForm.value.name.toLowerCase():"",
        email:this.facultyForm.value.email?this.facultyForm.value.email.toLowerCase():'',
        password:this.facultyForm.value.password?this.facultyService.hashedPassword(this.facultyForm.value.password):'',
        department:this.facultyForm.value.department?this.facultyForm.value.department.toLowerCase():"",
        subject:this.facultyForm.value.subject?this.facultyForm.value.subject.toLowerCase():"",
        subjectCode:this.facultyForm.value.subjectCode?this.facultyForm.value.subjectCode.toLowerCase():"",
        permitted:false
      }
      
      console.log(this.facultyDetails)
      this.facultyService.putData(this.facultyDetails,this.errorMessage)
      console.log("success")
      
    }
  }
 

}
