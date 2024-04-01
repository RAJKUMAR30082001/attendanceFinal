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
  public flag:boolean=true
  public subjectCode!:FormGroup
  public attendanceFlag:boolean=false
  public periodForm!:FormGroup
  public dayWisePeriod={}
  public periods:periodWiseData[]=[]
  public displaySubject:boolean=false
  public currentDay:number=0
  public periodCount:number=1
  public days:string[]=[]
  public formFlag:boolean=true
  public error!:HTMLDivElement
  constructor(private check:CheckValidityService,private render:Renderer2,private fb:FormBuilder,private adminService:AdminService) { }
  ngOnInit(): void {
    this.period=this.check.getData().subjectCode
    console.log(this.period)
    this.initializeCodeForm()
    if(this.period[0]==='' || this.period.length>0){
      console.log(this.period.length,'length')
      // this.error.innerHTML= "Go next"
      this.periodFlag=true
      this.flag=false
    }
    else{
    this.error=this.render.selectRootElement(".errorMessage")
    this.error.innerHTML= "Please add a Subject code first."
   }
}
  updateSubjectCodes(){
    this.periodFlag=true
  }
  nextPage(){
    if(this.error){
    this.error.innerHTML=""
  }
    if(this.flag){
    this.adminService.getUrl().subscribe(data=>{
      
      data.subjectCode=Object.values(this.subjectCode.value)
      data.hours = Object.fromEntries(
        Object.values(this.subjectCode.value).map(e => [e, 0])
      );
     
      
      this.adminService.updateAdmin(data)
    })
  }
    this.attendanceFlag=true
    this.formFlag=false
    this.initializeForm()
  }
  getDay():string{
   
    this.days=['monday','tuesday','wednesday','thursday','friday']
    return this.days[this.currentDay]
    
  }
  next(){
    
    let details:periodWiseData={
      subjectName:this.periodForm.value.subjectName?this.periodForm.value.subjectName.toLowerCase():'',
      subjectCode:this.periodForm.value.subjectCode?this.periodForm.value.subjectCode.toLowerCase():'',
      startTime:this.periodForm.value.startTiming?this.periodForm.value.startTiming.toLowerCase():'',
      endTime:this.periodForm.value.endTiming?this.periodForm.value.endTiming.toLowerCase():''

    }
    this.periodForm.reset()
    if(this.periodCount===2){
      this.dayWisePeriod={
        [this.days[this.currentDay]]:this.periods
      }
      console.log(this.dayWisePeriod)
      this.adminService.getUrl().subscribe(data=>{
        data.schedule.push(this.dayWisePeriod)
        this.adminService.updateAdmin(data)
      })
      this.currentDay++
      this.periods=[]
      this.periodCount=1
      
    }
    else{
     
      this.periodCount++
      this.periods.push(details);
      console.log(this.periods)
    }
    console.log(this.periodCount)

  }
  initializeForm(){
    this.periodForm=this.fb.group({
      subjectName:['',Validators.required],
      subjectCode:['',Validators.required],
      startTiming: ['', [Validators.required, Validators.pattern(/^(0\d|1[0-2]):[0-5]\d (AM|PM)$/i)]],
      endTiming:['',[Validators.required,Validators.pattern(/^(0\d|1[0-2]):[0-5]\d (AM|PM)$/i)]]
    })
  }
  initializeCodeForm(){
    this.subjectCode=this.fb.group({
      subjectCode1:['',[Validators.required]],
      subjectCode2:['',[Validators.required]],
      subjectCode3:['',[Validators.required]],
      subjectCode4:['',[Validators.required]],
      subjectCode5:['',[Validators.required]],
})
  }


}
