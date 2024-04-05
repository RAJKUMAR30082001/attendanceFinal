import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { FacultyService } from 'src/app/faculty.service';
import { StudentCouchService } from 'src/app/student-couch.service';

@Component({
  selector: 'app-holiday-input',
  templateUrl: './holiday-input.component.html',
  styleUrls: ['./holiday-input.component.scss']
})
export class HolidayInputComponent implements OnInit {
  public flag:boolean=false
  public monthArray:string[]=[]
  public leaveReason:string=''
  public year= new Date().getFullYear();
  public dates: string[] = [];
  public month:string=''
  public error!:HTMLDivElement
  public errorMes:string=''
  public arrayOfMonths:string[]=[]
  public value:string=''
  public count:number=1
  public updateFlag:boolean=false
  public updateValue!:string
  public months:string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


  constructor(private admin:AdminService,private faculty:FacultyService, private stdService:StudentCouchService){}
  ngOnInit(): void {
    this.admin.getUrl().subscribe(data=>{
    data.holiday.forEach((element: any) => {
      this.arrayOfMonths.push(Object.keys(element)[0])
      
    });
    })
  }
  enteredDate(event:Event)
  {
    this.value=(event.target as HTMLInputElement).value;
    this.validate(this.value)
  }
  updatedDate(event:Event)
  {
    this.updateValue=(event.target as HTMLInputElement).value;
    this.validate(this.updateValue)
  }
  validate(date:string):boolean{
    this.errorMes=' '
    let dateArray=date.split("-")
    console.log(date)
    this.month=this.months[Number(dateArray[1])-1]
    
    if(dateArray[0]!==String(new Date().getFullYear())){
      this.errorMes="Enter valid year"
      return false
      }
    if(this.check(date)){
      this.errorMes="Date already Passed"
      return false
    }
      
      return true
        
      
      }
    check(dates: string): boolean {
  
  
      return new Date(dates).getTime() < new Date().getTime();
    }
     
    
     clear(){
      this.leaveReason=''
      this.errorMes=''
      const datesInput = document.getElementById('dates') as HTMLInputElement;
     
      if (datesInput) {
        datesInput.value = '';
      }

     }
  
  
 
  addDates(){
      
  this.updateFlag=false

  
    if(this.arrayOfMonths.includes(this.month)){
      this.admin.getUrl().subscribe(data=>{
       data.holiday.forEach((item:any)=>{
        if(Object.keys(item)[0]===this.month){
          if(item[this.month].includes(this.value)){
            this.errorMes="date already exist any modification please update"
          }
          else{
          item[this.month].push(this.value)
          let notificationMes=`${this.value} is declare as holiday for ${this.leaveReason}`
          this.updateNotificationStudent(notificationMes)
          this.updateNotificationFaculty(notificationMes)
          this.admin.updateAdmin(data)}
        }
       })
      })
    }
    else{
      this.admin.getUrl().subscribe(data=>{
        let array={
          [this.month]: [this.value]
        }
        data.holiday.push(array)
        let notificationMes=`${this.value} is declare as holiday for ${this.leaveReason}`
        this.updateNotificationStudent(notificationMes)
        this.updateNotificationFaculty(notificationMes)
        
        this.admin.updateAdmin(data)
      })
    }
    

  }
  checkValid(){
    return new Date(this.value).getTime()< new Date(this.updateValue).getTime()
  }

  updateDates() {
    this.updateFlag = true;
    console.log(this.updateValue)
    if(this.updateValue!==undefined){
    const storedDate = this.value.split('-');
    const currentDay = this.updateValue.split('-');
  
    if (storedDate[1] !== currentDay[1]) {
      this.errorMes = "Enter valid month";
      return;
    }
  
    if (!this.checkValid()) {
      this.errorMes = "Date already passed";
      return;
    }
  
    this.admin.getUrl().subscribe(res => {
      
      const foundItem = res.holiday.find((item:any )=> {
        const key = Object.keys(item)[0];
      
        return item[key].includes(this.value);
      });
      const foundItems = res.holiday.find((item:any )=> {
        const key = Object.keys(item)[0];
      
        return item[key].includes(this.updateValue);
      });
     
      if (foundItem && foundItems===undefined) {
       
        const key = Object.keys(foundItem)[0];
        const index = foundItem[key].indexOf(this.value);
        
        if (index !== -1) {
          foundItem[key][index] = this.updateValue;
            
              let message=`leave on ${this.value} is updated to ${this.updateValue} for ${this.leaveReason}`
              this.updateNotificationStudent(message)
              this.updateNotificationFaculty(message)
              this.admin.updateAdmin(res)
            

         
        } else {
          this.errorMes = "Enter date is not exist";
        }
      } else {
        this.errorMes = "Enter date is not exist or Update date already exist";
      }
    });
  }else{
    console.log("comming")
  }
}

deleteDate(){
  this.updateFlag=false
  console.log("delete")
  if(this.value!==''){
    console.log(this.value)
  if(this.validate(this.value)){
    this.admin.getUrl().subscribe(res=>{
      let val=res.holiday.find((item:any)=>{
        let key=Object.keys(item)[0]
        return item[key].includes(this.value)
      })
      console.log(val)
      if(val){
        if(val[this.month].includes(this.value)){
          let index=val[this.month].indexOf(this.value)
          val[this.month].splice(index,1)
         
            let mes=`${this.value} is deleted for ${this.leaveReason}`
            this.updateNotificationStudent(mes)
            this.updateNotificationFaculty(mes)
          this.admin.updateAdmin(res)
        }
        else{
          this.errorMes='Date is not exist'
        }
      }
      else{
        this.errorMes='month or date is not exist'
      }
    })
  }
}

}

updateNotificationStudent(notifi:string){
  this.stdService.getFullDocument().subscribe(res=>{
    let details=res['2024']
    let key=Object.keys(details)
    key.forEach((item:any)=>{
      details[item].unSeen.push(notifi)
    })
    this.stdService.updateDocument(res)
  })
}
updateNotificationFaculty(notifi:string){
  this.faculty.getFullDocument().subscribe(data=>{
    let storedData=data['mca']
    let key=Object.keys(storedData)
    key.forEach(item=>{
      storedData[item].unSeen.push(notifi)
    })
    this.faculty.updateDocument(data)
  })
}
 
}

  
