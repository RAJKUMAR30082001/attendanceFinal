import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-holiday-input',
  templateUrl: './holiday-input.component.html',
  styleUrls: ['./holiday-input.component.scss']
})
export class HolidayInputComponent implements OnInit {
  public flag:boolean=false
  public year= new Date().getFullYear();
  public dates: string[] = [];
  public month:string=''
  public error!:HTMLDivElement
  public errorMes:string=''
  public arrayOfMonths:string[]=[]
  public value:string=''
  public months:string[] = [
    "Select Month",
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


  constructor(private admin:AdminService){}
  ngOnInit(): void {
    this.admin.getUrl().subscribe(data=>{
    data.holiday.forEach((element: any) => {
      this.arrayOfMonths.push(Object.keys(element)[0])
    });
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
    console.log(this.month,"i am month")
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
  check(dates: string[]): boolean {
   
    const allDatesValid = dates.every((element) => {
      return new Date(element).getTime() >= new Date().getTime();
    });
  
    if (!allDatesValid) {
      this.errorMes = "Date already passed";
    }
  
    
    return allDatesValid;
  }
  addDates(){

    console.log(this.arrayOfMonths,this.month)
    if(this.arrayOfMonths.includes(this.month)){
      
      this.errorMes="Month already exist if any modification please update"
    }
    else{
      this.admin.getUrl().subscribe(data=>{
        let array={
          [this.month]: this.dates
        }
        data.holiday.push(array)
        this.admin.updateAdmin(data)
      })
    }
    this.clearData()

  }
  updateDates(){
    
    if (this.arrayOfMonths.includes(this.month)) {
      if (this.check(this.dates)) {
        this.admin.getUrl().subscribe(data => {
          data.holiday.forEach((element: any) => {
            const currentMonth = Object.keys(element)[0];
            
            if (currentMonth === this.month && !this.flag) {
              
              this.dates.forEach((date: string) => {

                element[currentMonth].push(date);
              });
  
              element[currentMonth] = [...new Set(element[currentMonth])];
            }
            else if(this.flag && currentMonth === this.month){
              this.dates.forEach((date: string) => {
                const index = element[currentMonth].indexOf(date);
                if (index !== -1) {
                  element[currentMonth].splice(index, 1);
                }
              });
              this.flag=false
            }
          });
  
          this.admin.updateAdmin(data);
          this.clearData()
        });
      }
    }
  else{
   
    this.errorMes="Month did not exist"
    this.clearData()
  }

  
  
  }
  clearData(){
    const datesInput = document.getElementById('dates') as HTMLInputElement;
    const monthSelect = document.getElementById('month') as HTMLSelectElement;

    if (datesInput) {
      datesInput.value = '';
    }
    if (monthSelect) {
      monthSelect.value = '';
    }
    this.month=''
    this.dates=[]
  }

  deleteDates(){
    this.flag=true
  }
  
}
