import { AfterViewInit, Component,OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';
import { StudentCouchService } from 'src/app/student-couch.service';
import { Chart} from 'chart.js/auto'
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrls: ['./attendance-view.component.scss']
})
export class AttendanceViewComponent implements OnInit,AfterViewInit{
  
  canvas:any
  ctx:number=0
  flag=true
  public percentage:{[key:string]:number}={}
  constructor(public stdCouch:StudentCouchService,public check:CheckValidityService,private admin:AdminService){}
  ngOnInit():void {
   console.log(this.flag,"...")
    let data=this.check.getData().attendanceRecord
 
    data.forEach((item:{[key:string]:number})=>{
      Object.keys(item).forEach(key=>{
        this.percentage[key.toUpperCase()]=item[key]
      })
     
      
           
    })
    

  }
 ngAfterViewInit(): void 
   
 {
  if(this.flag){
 this.barGraph()}
  
}
back(){
  this.flag=true
  setTimeout(()=>this.barGraph(),1000)
}
overAll(){
  this.flag=false
  let totalHours:number
  const totalHoursAttended=Object.values(this.check.getData().numberOfClasses).reduce((a:number,b:any)=>{
    return a+b
  },0)
  console.log(totalHoursAttended)
 this.admin.getUrl().subscribe(data=>{
  totalHours=Object.values(data["hours"]).reduce((a:number,b:any)=>{
      return a+b
    },0)
    const val:number=Math.round(totalHoursAttended/totalHours*100);
    this.pieDraw(val)
  })
 
}
pieDraw(percentage:number){
  let pieArray:number[]=[]
  pieArray.push(percentage)
  pieArray.push(100-percentage)
  new Chart(document.getElementById("pieChart") as HTMLCanvasElement, {
    type: 'doughnut',
    data: {
      labels:["Present %","Absent %"],
      datasets: [{
        
        data: pieArray,
        backgroundColor: ['rgb(117, 225, 9)','grey'],
        hoverOffset:4,
        borderJoinStyle:'bevel',
        borderColor:'black'
      }],
     
    },
    options: {
      plugins: {
        legend: {
          labels: {
           color:'black'
            }
          }
        }
      }
})
  
}
barGraph(){
  
  new Chart(document.getElementById("myChart") as HTMLCanvasElement, {
    type: 'bar',
    data: {
      labels:Object.keys(this.percentage),
      datasets: [{
        label:'',
        data: Object.values(this.percentage),
        backgroundColor: ['#007bff', '#28a745', '#fd7e14', '#6610f2', '#6f42c1'],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false 
        }
      },
      scales: {
        y: {
          ticks: {
           display:false
          },
          grid: {
            display: false 
          }
        },
        x: {
          grid: {
            display: false 
          },
          ticks: {
            color:"black",
            font:{
              size:14
            }
          }
        }
      }
 }
});

}
}

