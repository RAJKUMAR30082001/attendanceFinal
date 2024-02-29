import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckValidityService } from 'src/app/check-validity.service';

@Component({
  selector: 'app-permit-letter',
  templateUrl: './permit-letter.component.html',
  styleUrls: ['./permit-letter.component.scss']
})
export class PermitLetterComponent implements OnInit {
 constructor(private check:CheckValidityService,private fb:FormBuilder){}
 details!:string
 leaveForm!:FormGroup
 ngOnInit():void {
  this.leaveForm=this.fb.group({
    name:['',[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
    department:['',[Validators.required,Validators.pattern(/^[a-zA-Z\s]+$/)]],
    subjectCode:['',]
  })

  
 }
 onSubmit(){}
}
