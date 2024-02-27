import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckValidityService {
  UserAuth:boolean=true
  constructor(private route:Router) { }
  SetData(details:any,type?:boolean){
    if(type){
    localStorage.setItem("userAuth",String(this.UserAuth))
    localStorage.setItem("userDetails",JSON.stringify(details))
    }
    else{
    localStorage.setItem("userAuth",String(this.UserAuth))
    localStorage.setItem("userDetails",JSON.stringify(details))
    this.route.navigate(['/studentHome'])
  }
  }
  getData():any{
    const details=localStorage.getItem("userDetails")
    if(details){
      return JSON.parse(details)
    }
    return null
  }
  getAuth():boolean|null{
    const auth=localStorage.getItem('userAuth')
    if(auth)
    return Boolean(auth)
  return null
  }
  removeData() {
    // Remove 'userAuth' and 'userDetails' from localStorage
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userDetails');
    this.route.navigate(['/home'])
  }
}
