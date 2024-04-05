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
        storedData[item].seen=storedData[item].unSeen.map((notifi:string)=> {return notifi})
        storedData[item].unSeen=[]
        this.stdCouch.updateDocument(res)
      })
    })
  }
  
}
