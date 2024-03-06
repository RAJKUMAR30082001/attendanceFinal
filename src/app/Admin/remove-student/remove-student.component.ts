import { Component, OnInit, Renderer2 } from '@angular/core';
import { StudentCouchService } from 'src/app/student-couch.service';



@Component({
  selector: 'app-remove-student',
  templateUrl: './remove-student.component.html',
  styleUrls: ['./remove-student.component.scss']
})
export class RemoveStudentComponent implements OnInit{
DeptName: string='';
registerNumber:string=''
array:any[]=[]
error!:HTMLDivElement


constructor(private stdCouch:StudentCouchService,private render:Renderer2){}
ngOnInit() {
  this.error=this.render.selectRootElement(".errorMessage")
}
getDepartment(event:Event){
  this.DeptName=(event.target as HTMLInputElement)?.value.toLowerCase()
}
getRegisterNo(event: Event) {
  this.registerNumber=(event.target as HTMLInputElement)?.value.toLowerCase();
}


filter() {
  this.stdCouch.getFullDocument().subscribe(data => {
    console.log(this.registerNumber);
    const yearArray = data?.['2024'] || {};
    
    const student = Object.entries(yearArray)
      .find(([key, value]) => key === this.registerNumber && value);
    console.log(student)
    if (student) {
      this.array = [student[1]]; 
    } else {
      this.error.innerHTML = 'No such student found';
    }
  });
}

deleteStudent(regNo:string){
  this.stdCouch.getFullDocument().subscribe(data=>{
    if(data['2024']){
      let yearArray=data['2024']
      delete yearArray[regNo]
      this.stdCouch.updateDocument(data)

    }
  })
}

}
