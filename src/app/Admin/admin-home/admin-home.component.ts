import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { CheckValidityService } from 'src/app/check-validity.service';
import { FacultyService } from 'src/app/faculty.service';
import { StudentCouchService } from 'src/app/student-couch.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  auth!:boolean|null
  data!:any
  studentData!:any
  facultyData!:any
  Destroy!:any
  FacultyDestroy!:any
  FacultyHaveToPermit:[]=[]
  constructor(private check:CheckValidityService,private stdService:StudentCouchService,private facultyService:FacultyService,private adminService:AdminService){}
  ngOnInit(): void {
    this.auth=this.check.getAuth()
    console.log(this.auth)
    if(this.auth){
      this.data=this.check.getData()
      this.Destroy=this.stdService.getAdminRequiredData().subscribe(data=>{
        this.studentData=data
        
        console.log(this.studentData)
      })
      this.FacultyDestroy=this.facultyService.getFacultyData().subscribe(data=>{
        this.facultyData=data
        this.adminService.setFacultyDetails(this.facultyData)
        console.log(this.facultyData)
      })

    }
  }
  Logout(){
    this.check.removeData()
  }
  //yet to complete
  

}
