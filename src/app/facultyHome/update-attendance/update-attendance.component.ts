import { Component, OnInit, Renderer2 } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';
import { StudentCouchService } from 'src/app/student-couch.service';
import { StudentData, facultyLogin } from 'src/app/student-data';

@Component({
  selector: 'app-update-attendance',
  templateUrl: './update-attendance.component.html',
  styleUrls: ['./update-attendance.component.scss']
})
export class UpdateAttendanceComponent implements OnInit {
  public details!:facultyLogin
  public flag:boolean=false
  public displayStudent:StudentData[]=[]
  public subjectCode:string=''
  public percentage:number[]=[]
  public elementValue:string=''
  public percentageValue!:number
  public filteredValue!:any
  public showUpdateContainer:boolean = false;
  constructor (private stdService:StudentCouchService,private check:CheckValidityService,private render:Renderer2) {}
  ngOnInit(): void {
    this.details=this.check.getData()
    this.subjectCode=this.details.subjectCode
    this.getDetails()
  }
  updateAttendance(regNo:string){
    this.showUpdateContainer=true
    let flashContainer=this.render.selectRootElement("#flash-container") as HTMLDivElement
    console.log(flashContainer)
    // flashContainer.style.display="block"

  }
  obtainPercentage(value: any):any {
    const attendanceRecord = value.attendanceRecord;
  
    const targetObject = attendanceRecord.find((record: { [key: string]: number }) =>
    record.hasOwnProperty(this.subjectCode)
  );

    if (targetObject) {
      this.percentageValue = targetObject[this.subjectCode];
      console.log(this.percentageValue)
      this.percentage.push(this.percentageValue);
    }
  }
  filterTable(){
    this.flag=true
    this.elementValue=(document.getElementById("filterInput") as HTMLInputElement).value.toLowerCase()
    console.log(this.elementValue)
    this.getDetails()
    
  }
  getDetails(){
    this.stdService.getRequiredData().subscribe(data=>{
      let key=Object.keys(data);
      this.displayStudent=key.map(i=>{
        if(this.flag && i===this.elementValue){
          this.filteredValue=data[i]
          this.obtainPercentage(data[i])
        }
        else{
        this.obtainPercentage(data[i])
        return  data[i]
      }
      })
    })
  }

confirmUpdate(){}
  
}
