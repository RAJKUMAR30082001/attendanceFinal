import { Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.scss']
})
export class FacultyHomeComponent implements  OnInit {
  facultyDetails!:any
  constructor(private check:CheckValidityService){}
  ngOnInit(): void {
    let auth=this.check.getAuth()
    if(auth){
      this.facultyDetails=this.check.getData()
    }
  }

}
