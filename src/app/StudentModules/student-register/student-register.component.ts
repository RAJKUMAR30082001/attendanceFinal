import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentData } from '../../student-data';
import { StudentCouchService } from '../../student-couch.service';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/faculty.service';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  studentDetails!: StudentData;
  valid: boolean = false;
  errorDivElement!:HTMLDivElement
  currentYear!:number
  RegisterNumber!:string
  adminData!:[]



  constructor(private fb: FormBuilder,private service:StudentCouchService,private red:Renderer2,private router:Router,private faculty:FacultyService,private adminService:AdminService) {}
  

  ngOnInit() {
    this.errorDivElement=this.red.selectRootElement(".errorMessage")
    this.currentYear= new Date().getFullYear();
    this.adminService.getUrl().subscribe(data=>{
      this.adminData=data.subjectCode
    })
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      middleName: ['', [Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: ['', [Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      registerNumber: ['', [Validators.required, Validators.minLength(10)]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^917722[Yy]\d+$/
          )]
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/)]
      ]
    });
  }

  checkPasswordCorrect(pass: string, confirmPass: string): boolean {
    return pass === confirmPass;
  }

  onRegister() {
    this.errorDivElement.innerHTML=''
    if (this.registerForm.valid) {
      if (this.checkPasswordCorrect(this.registerForm.value.password, this.registerForm.value.confirmPassword)) {
        this.studentDetails = {
          firstName: this.registerForm.value.firstName ? this.registerForm.value.firstName.toLowerCase() : null,
          middleName: this.registerForm.value.middleName ? this.registerForm.value.middleName.toLowerCase() : null,
          lastName: this.registerForm.value.lastName ? this.registerForm.value.lastName.toLowerCase() : null,
          department: this.registerForm.value.department.toLowerCase(),
          registerNumber: this.registerForm.value.registerNumber,
          email: this.registerForm.value.email,
          password: this.service.hashedPassword(this.registerForm.value.password),
          leaveLetter:[],
          notification:[],
          numberOfClasses:this.getNumberOfClasses(),
          attendanceRecord:this.AttendanceRecord()
        };

        this.service.putDocuments(this.studentDetails,this.currentYear,this.errorDivElement);
        this.registerForm.reset();
        this.router.navigate(['/faceRegister',this.studentDetails.registerNumber])
      } else {
        this.errorDivElement.innerHTML="Enter correct password"
      }
    }
  }
  getNumberOfClasses():any{
    return Object.fromEntries(
      this.adminData.map(e => [e, 0])
    );
    
  }
  AttendanceRecord():any{
    return this.adminData.map(ele=>{
      return {[ele]:0}
    })
  }
}
