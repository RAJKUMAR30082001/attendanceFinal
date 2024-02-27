import { Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';

@Component({
  selector: 'app-studenthomepage',
  templateUrl: './studenthomepage.component.html',
  styleUrls: ['./studenthomepage.component.scss']
})
export class StudenthomepageComponent implements OnInit{
  StudentDetail:any
  userAuth!:boolean|null
  userDetails!:any
  keys!:string[]
constructor(private service:CheckValidityService){}
    ngOnInit(): void {
      this.userAuth=this.service.getAuth()
      if(this.userAuth===true){
        this.userDetails=this.service.getData()
        console.log(this.userDetails)
        this.keys=Object.keys(this.userDetails)
      }
    }
    Logout(){
      this.service.removeData()
      
    }
}
