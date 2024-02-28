import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacultyService } from 'src/app/faculty.service';
import { facultyLogin } from 'src/app/student-data';

@Component({
  selector: 'app-faculty-admit',
  templateUrl: './faculty-admit.component.html',
  styleUrls: ['./faculty-admit.component.scss']
})
export class FacultyAdmitComponent implements OnInit{
  facultyDataToPermit!:any
  
  constructor(private  Service : FacultyService) {}
  ngOnInit(): void {
    
    this.Service.getFacultyData().subscribe((data:facultyLogin) => {
      console.log(data);
    this.facultyDataToPermit = Object.values(data)
  .filter(value => !value.permitted);
    });

   
    
    }
    allowFaculty(email:string,department:string,faculty:any){
      this.Service.getFullDocument().subscribe(data=>{
        if(data[department]){
          let FullData=data[department];
          if(FullData[email]){
            let finalData=FullData[email]
            console.log(finalData)
            finalData.permitted=true;
            this.Service.updateDocument(data)
          }
        }
      })
      this.removeFromPending(faculty)
    }
    denyFaculty(email:string,department:string,faculty:any){
      this.Service.getFullDocument().subscribe(data=>{
        if(data[department]){
          let FullData=data[department];
          if(FullData[email]){
            delete FullData[email]
            this.Service.updateDocument(data)
          }
        }
      })
      this.removeFromPending(faculty)
    }
    removeFromPending(faculty:any){
      const index=this.facultyDataToPermit.indexOf(faculty)
      if(index!=-1){
        this.facultyDataToPermit.splice(index,1)
      }
    }
    
  }
