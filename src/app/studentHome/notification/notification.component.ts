import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { CheckValidityService } from 'src/app/check-validity.service';
import { StudentData } from 'src/app/student-data';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public userDetails!:StudentData
  public attendanceShortage!:[]
  public hours!:any
  public j:number=1
  public container!:HTMLDivElement
  constructor(private check:CheckValidityService,private adminService:AdminService){}

  ngOnInit() {
    this.container=document.getElementById("notification") as HTMLDivElement
    this.userDetails=this.check.getData()
    this.leavePermit()
    this.adminService.getUrl().subscribe(data=>{
      this.hours=data.hours
      this.notify(this.userDetails)
    })
   
    
  }
  notify(details: StudentData) {
    details.attendanceRecord.forEach((element: any) => {
      const key = Object.keys(element)[0] as keyof typeof details.numberOfClasses;
      let classesAttended = details.numberOfClasses[key];
      
      if (element[key] < 70 && this.hours[key] !== 0) {
        for (this.j = 1; (classesAttended / (this.hours[key]+ 1)) * 100 < 75; this.j++) {
          classesAttended++;
          
        }
        const para= document.createElement('p') as HTMLParagraphElement
        para.innerHTML=`<strong>Required period to attend for ${key}: ${this.j-1} </strong>`
        this.container?.appendChild(para)
        
      }
    });
  }

  leavePermit(){
    let request=this.userDetails.leaveLetter
    request.forEach(item=>{
      if(item.bool){
        this.addString(`Leave granted for ${item.subjectCode} on ${item.leaveDate}`)
      }
      else{
        if(this.passedDate(item.leaveDate)){
          this.addString(`Leave on ${item.leaveDate} is waiting`)
        }
        else{
          this.addString(`Leave on ${item.leaveDate} is denied`)
        }
      }
    })
  }
  passedDate(date:Date):boolean{
    const year=new Date().getTime()
    const currentDate=new Date().getTime()
    if(year>currentDate){
      return false
    }
    else{
      return true
    }
  }
  addString(str:string){
    const para= document.createElement('p') as HTMLParagraphElement
        para.innerHTML=`<strong>${str}</strong>`
        this.container?.appendChild(para)
  }
  
}
