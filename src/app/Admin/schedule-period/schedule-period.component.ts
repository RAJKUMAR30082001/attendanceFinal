import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { CheckValidityService } from 'src/app/check-validity.service';
import { periodWiseData } from 'src/app/student-data';

@Component({
  selector: 'app-schedule-period',
  templateUrl: './schedule-period.component.html',
  styleUrls: ['./schedule-period.component.scss']
})
export class SchedulePeriodComponent implements OnInit{
  public period = [];
  public periodFlag:boolean=false
  public divElement!:HTMLDivElement
  public flag=true
  public subjectCode!:FormGroup
  public attendanceFlag!:false
  public periodForm!:FormGroup
  public dayWisePeriod={}
  public periods:periodWiseData[]=[]
  public displaySubject:boolean=false
  public currentDay:number=0
  public periodCount:number=1
  public days:string[]=[]
  constructor(private check:CheckValidityService,private render:Renderer2,private fb:FormBuilder,private adminService:AdminService) { }
  ngOnInit(): void {
    this.period=this.check.getData().subjectCode
    console.log(this.period)
    if(this.period.length>0){
      this.periodFlag=true
    }
    this.subjectCode=this.fb.group({
      subjectCode1:['',[Validators.required]],
      subjectCode2:['',[Validators.required]],
      subjectCode3:['',[Validators.required]],
      subjectCode4:['',[Validators.required]],
      subjectCode5:['',[Validators.required]],
})
}
  updateSubjectCodes(){
    this.periodFlag=false
  }
  nextPage(){
    this.adminService.getUrl().subscribe(data=>{
      let arrayData=data.subjectCode
      arrayData=Object.values(this.subjectCode.value)
      data.subjectCode=arrayData
      this.adminService.updateAdmin(data)
    })
    this.displaySubject=true
    
  }
  getDay():string{
    this.initializeForm()
    this.days=['monday','tuesday','wednesday','thursday','friday']
    return this.days[this.currentDay]
    
  }
  next(){
    let details:periodWiseData={
      subjectName:this.periodForm.value.subjectName?this.periodForm.value.subjectName.toLowerCase():'',
      subjectCode:this.periodForm.value.subjectCode?this.periodForm.value.subjectCode.toLowerCase():'',
      startTime:this.periodForm.value.startTime,
      endTime:this.periodForm.value.endTime

    }
    this.periodForm.reset()
    if(this.periodCount>4){
      this.dayWisePeriod={
        [this.days[this.currentDay]]:this.periods
      }
      this.adminService.getUrl().subscribe(data=>{
        data.schedule.push(this.dayWisePeriod)
        this.adminService.updateAdmin(data)
      })
      this.currentDay++
      this.periods=[]
      
    }
    else{
     
      this.periodCount++
      this.periods.push(details);
    }

  }
  initializeForm(){
    this.periodForm=this.fb.group({
      subjectName:['',Validators.required],
      subjectCode:['',Validators.required],
      startTiming:['',Validators.required],
      endTiming:['',Validators.required]
    })
  }

}
