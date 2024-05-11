import { Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.scss']
})
export class FacultyHomeComponent implements  OnInit {
  facultyDetails!:any
  flag:boolean=false;
  holiday:boolean=false
  updateFlag:boolean=true
  constructor(private check:CheckValidityService){}
  ngOnInit(): void {
    let auth=this.check.getAuth()
    if(auth){
      this.facultyDetails=this.check.getData()
    }
  }
  update(event:Event){
    event.preventDefault()
    this.flag=false
    this.holiday=false
  }
  grantPermission(event:Event){
    event.preventDefault()
    this.flag=true
    this.updateFlag=false
    this.holiday=false
  }
  logout(){
    this.check.removeData()
  }
  holidayEvent(event:Event){
    event.preventDefault()
    this.flag=false
    this.updateFlag=false
    this.holiday=true
  }
}
