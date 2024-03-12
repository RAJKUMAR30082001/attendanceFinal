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
  constructor(private check:CheckValidityService,private adminService:AdminService){}

  ngOnInit() {
    this.userDetails=this.check.getData()
    this.adminService.getUrl().subscribe(data=>{
      this.hours=data.hours
      this.notify(this.userDetails)
    })
    console.log(this.hours)
    
  }
  notify(details: StudentData) {
    details.attendanceRecord.forEach((element: any) => {
      const key = Object.keys(element)[0] as keyof typeof details.numberOfClasses;
      let classesAttended = details.numberOfClasses[key];
      
      if (element[key] < 70 && this.hours[key] !== 0) {
        for (let j = 1; (classesAttended / (this.hours[key]+ 1)) * 100 < 75; j++) {
          classesAttended++;
          console.log(`Required period to attend for ${key}: ${j}`);
        }
      }
    });
  }
  
}
