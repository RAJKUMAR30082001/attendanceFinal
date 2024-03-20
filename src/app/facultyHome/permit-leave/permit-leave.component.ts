import { Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';
import { FacultyService } from 'src/app/faculty.service';
import { StudentCouchService } from 'src/app/student-couch.service';

@Component({
  selector: 'app-permit-leave',
  templateUrl: './permit-leave.component.html',
  styleUrls: ['./permit-leave.component.scss']
})
export class PermitLeaveComponent implements OnInit {
  details:any
  requestLetters:any
  year:number=new Date().getFullYear()
  flag:boolean=false
  file:any
constructor (private check:CheckValidityService,private stdService:StudentCouchService,private faculty:FacultyService){}
ngOnInit(): void {
  this.details=this.check.getData()
  this.requestLetters=this.details.leavePermission
  console.log(this.requestLetters)
}
approvePermission(registerNumber:string,fullData:any){
 console.log(this.details)
this.flag=true
const attachmentData=this.details.leavePermission[1].uploadFile._attachments.filename.data
const contentType=this.details.leavePermission[1].uploadFile._attachments.filename.content_type
this.file = 'data:' + contentType + ';base64,' + attachmentData;


  // this.stdService.getFullDocument().subscribe(data=>{
  //   if(data[this.year]){
      
  //     let detail=data[this.year]
  //     if(detail[registerNumber]){
  //       let leaveArray=detail[registerNumber].leaveLetter
  //       console.log(leaveArray)
  //       leaveArray[0]['bool']=true
  //       this.stdService.updateDocument(data)
  //       this.removeDataFromFacultyDetails(fullData)
        
        
  //     }
  //   }
  // })
  // this.removeFromArray(fullData)
}
rejectPermission(fullData:any){
  this.removeDataFromFacultyDetails(fullData)
  this.removeFromArray(fullData)
}
removeDataFromFacultyDetails(fullData: any) {
  this.faculty.getFullDocument().subscribe(data => {
    if (data[this.details.department]) {
      let departmentData = data[this.details.department];
      
      if (departmentData[this.details.email]) {
        let detail = departmentData[this.details.email].leavePermission;

        // Filter out the object with the matching registerNumber
        detail = detail.filter((i: { registerNumber: any; }) => {
          return i.registerNumber !== fullData.registerNumber;
        });

        // Update the leavePermission array in the document
        departmentData[this.details.email].leavePermission = detail;

        // Update the document in the database
        this.faculty.updateDocument(data);
      }
    }
  });
}

removeFromArray(data:any){
 
    const index=this.requestLetters.indexOf(data)
    if(index!=-1){
      this.requestLetters.splice(index,1)
    }
  
}
}
