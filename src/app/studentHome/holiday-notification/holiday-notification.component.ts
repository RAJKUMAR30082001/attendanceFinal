import { Component, OnDestroy, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';
import { StudentCouchService } from 'src/app/student-couch.service';

@Component({
  selector: 'app-holiday-notification',
  templateUrl: './holiday-notification.component.html',
  styleUrls: ['./holiday-notification.component.scss']
})
export class HolidayNotificationComponent implements OnInit, OnDestroy{
  public notification!:[]
  public notifications!:[]
  constructor(private stdCouch:StudentCouchService,private check:CheckValidityService){}
  ngOnInit(): void {
    this.notification=this.check.getData().unSeen
    console.log(this.notification)
  }
  ngOnDestroy(): void {
    console.log("destroy")
    this.stdCouch.getFullDocument().subscribe((res:any)=>{
      let storedData=res['2024']
      let key=Object.keys(storedData)
      key.forEach((item:any)=>{
       
        if(item===this.check.getData().registerNumber){
        storedData[item].unSeen.forEach((notifi:string)=> {
          storedData[item].seen.push(notifi)
        })
        console.log(storedData[item].seen)
        storedData[item].unSeen=[]
        this.stdCouch.updateDocument(res)
      }
      })
    })
  }

  viewmsg(){
    console.log(this.check.getData())
    this.notifications=this.check.getData().seen
    console.log(this.notifications)
  }
  
}
