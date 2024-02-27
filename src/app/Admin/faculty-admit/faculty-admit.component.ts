import { Component, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/faculty.service';

@Component({
  selector: 'app-faculty-admit',
  templateUrl: './faculty-admit.component.html',
  styleUrls: ['./faculty-admit.component.scss']
})
export class FacultyAdmitComponent implements OnInit{
  facultyDataToPermit!:any
  constructor(private  Service : FacultyService) {}
  ngOnInit(): void {
    this.facultyDataToPermit=this.Service.getFacultyData()
    console.log(this.facultyDataToPermit)
    let keys=Object.keys(this.facultyDataToPermit).filter(key=> this.facultyDataToPermit[key].permitted===false)
    console.log(keys)
    }
  }
