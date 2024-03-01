import { Component, OnInit } from '@angular/core';
import { CheckValidityService } from 'src/app/check-validity.service';

@Component({
  selector: 'app-permit-leave',
  templateUrl: './permit-leave.component.html',
  styleUrls: ['./permit-leave.component.scss']
})
export class PermitLeaveComponent implements OnInit {
  details:any
  requestLetters:any
constructor (private check:CheckValidityService){}
ngOnInit(): void {
  this.details=this.check.getData()
  this.requestLetters=this.details.leavePermission
}
}
