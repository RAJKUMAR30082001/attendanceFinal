import { Component, OnInit, Renderer2 } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-holiday-input',
  templateUrl: './holiday-input.component.html',
  styleUrls: ['./holiday-input.component.scss']
})
export class HolidayInputComponent implements OnInit {
  public year= new Date().getFullYear();
  public dates: string[] = [];
  public month:string=''
  public error!:HTMLDivElement
  public errorMes:string=''
  public arrayOfMonths:string[]=[]
  public value:string=''
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

  constructor(private render:Renderer2,private admin:AdminService){}
  ngOnInit(): void {
    this.admin.getUrl().subscribe(data=>{
      this.arrayOfMonths=Object.keys(data.holiday)
    })
  }
  enteredDates(event:Event){
    this.value=(event.target as HTMLInputElement).value;
    if(this.validate(this.value)){
      if(!this.dates.includes(this.value))
      this.dates.push(this.value)
    }
    
   
  }
  selectedMonth(event:Event){
    this.month=(event.target as HTMLSelectElement).value;
  }

  validate(date:string):boolean{
    this.errorMes=' '
    if(this.month){
      let index=String(this.months.indexOf(this.month)+1)
      if(Number(index)<10){
        index="0"+index
      }
      let dateArray=date.split("-")
      if(dateArray[0]!==String(new Date().getFullYear())|| dateArray[1]!==index){
        this.errorMes="Enter valid year or month"
        
        return false
      }
      
        return true
     
      
    }
    else{
      this.errorMes="Select the month"
      return false
    }
  }
  check(date:string):boolean{
    if(new Date(date).getTime()<new Date().getTime()){
      this.errorMes="Date already passed"
      return false
    }
    else{
      return true
    }
  }
  addDates(){
    if(this.arrayOfMonths.includes(this.month)){
      this.errorMes="Month already exist if any modification please update"
    }
    else{
      this.admin.getUrl().subscribe(data=>{
        data.holiday={
          [this.month]:this.dates
        }
        this.admin.updateAdmin(data)
      })
    }
  }
}
