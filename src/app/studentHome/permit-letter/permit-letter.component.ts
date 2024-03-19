import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CheckValidityService } from 'src/app/check-validity.service';
import { FacultyService } from 'src/app/faculty.service';
import { StudentCouchService } from 'src/app/student-couch.service';
import { leaveLetterForm } from 'src/app/student-data';

@Component({
  selector: 'app-permit-letter',
  templateUrl: './permit-letter.component.html',
  styleUrls: ['./permit-letter.component.scss']
})
export class PermitLetterComponent implements OnInit {
 constructor(private check:CheckValidityService,private fb:FormBuilder,private stdService:StudentCouchService,private facultyService:FacultyService){}
 details!:any
 leaveForm!:FormGroup
 year=new Date().getFullYear()
 storedDept:any
 names!:string
 registerNumbers!:string
 departments!:string
 ngOnInit():void {
  this.facultyService.facultyForLetter().subscribe(data=>
    console.log(data))
  this.formValidation()
  this.names=this.check.getData().firstName.toUpperCase()
 this.registerNumbers=this.check.getData().registerNumber
 this.departments=this.check.getData().department
}
 formValidation(){

 

  this.leaveForm=this.fb.group({
    subjectCode:['',[Validators.required,this.checkSubjectCode.bind(this)]] ,
    leaveDate:['',[Validators.required,this.checkDataValid.bind(this)]],
    reason:['',[Validators.required]]
  })
 }
 onSubmit(){
  this.details={
    name:this.names.toLowerCase(),
    registerNumber:this.registerNumbers,
    department:this.departments.toLowerCase(),
    subjectCode:this.leaveForm.value.subjectCode?this.leaveForm.value.subjectCode.toLowerCase():"",
    leaveDate:this.leaveForm.value.leaveDate,
    reason:this.leaveForm.value.reason,
    bool:false
  }
  console.log(this.details)
  
  this.facultyData(this.details)
  this.storedDept=this.check.getData()
  this.stdService.getFullDocument().subscribe(data=>{
    if(data[this.year]){
      let stdDetails=data[this.year]
      if(stdDetails[this.getData("registerNumber")]){
        let stdOfRegisterNumber=stdDetails[this.getData("registerNumber")].leaveLetter
        console.log(stdOfRegisterNumber)
        stdOfRegisterNumber.push(this.details)
        console.log(stdDetails[this.getData("registerNumber")])
        this.stdService.updateDocument(data)
        this.leaveForm.reset()
      }
    }
  })
 }

 checkDataValid(control:AbstractControl):ValidationErrors| null{
  const enteredDate=new Date(control.value).getTime()
  const  CurrentDate= new Date().getTime()

  if(enteredDate>=CurrentDate){
    return null
  }
  else{
    return {invalidDate:true}
  }
}
// checkDepartment(control:AbstractControl):ValidationErrors |null{
//   const dept=control.value
//   if(dept.toLowerCase()===this.getData('department')){
//     return null
//   }
//   else{
//     return {departmentError:true}
//   }
// }
// checkRegisterNumber(control: AbstractControl) : ValidationErrors | null{
//   const  regNo = control.value?control.value.toLowerCase():"";
//   if(regNo===this.getData('registerNumber')){
//     return null
//   }
//   else{
//     return {registerNumberError:true}
//   }
// }
checkSubjectCode(control:AbstractControl) :ValidationErrors| null{
  let subjectCodeList=Object.keys(this.getData("numberOfClasses"))
  let code=control.value?control.value.toLowerCase():''
  if(subjectCodeList.includes(code)){
    return null
  }
  else{
    return{subjectNotAvailable: true}
  }
}
getData(value:string):any{
  let data=this.check.getData()
  return data[value]
}

facultyData(data: leaveLetterForm) {
  let subCode = data.subjectCode;
  this.facultyService.getFullDocument().subscribe(res => {
    if (res[this.departments]) {
      let facultyDetail = res[this.departments];
      let key = Object.keys(facultyDetail).find(key => {
        if (facultyDetail[key].subjectCode === subCode) {
          let array = facultyDetail[key].leavePermission;
          array.push(this.details);
          return true; 
        }
        return false;
      });

      if (key) {
        this.facultyService.updateDocument(res);
      }
    }
  });
}

}
