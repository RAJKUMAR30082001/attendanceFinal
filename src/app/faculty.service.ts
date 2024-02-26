import { Injectable } from '@angular/core';
import { StudentCouchService } from './student-couch.service';
import { facultyLogin } from './student-data';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private stdService:StudentCouchService,private http:HttpClient) { }
  private baseUrl=`${this.stdService.apiUrl}/faculty`
  private Header=this.stdService.getHeader()

  putData(data:facultyLogin,errorMessage:HTMLDivElement){
    console.log("coming")
    let email:string=data.email
    let subjectCode:string=data.subjectCode
    let department:string=data.department
    this.http.get<any>(this.baseUrl,{headers:this.Header}).subscribe((res)=>{
      if(res[department]){
        let details=res[department]
        if(details[subjectCode]){
          errorMessage.innerHTML="subject code already exist"
          return
        }
        console.log(details)
       let key=Object.keys(details)
       console.log(key)
       let emailExist=key.some(keys=> details[keys].email===email)
       console.log(emailExist)
       let subjectExist=key.some(keys=> details[keys].subjectExist===subjectCode)
       if(emailExist){
        errorMessage.innerHTML="email already exist"
        return
       }
       else if(subjectExist){
        errorMessage.innerHTML="subject already exist"
        return
       }
       details[subjectCode]=data
       this.updateDocument(res)


      }
      res[department]={
        [subjectCode]:data
      }
      this.updateDocument(res)
    })

  }
  updateDocument(doc:any){
    this.http.put(this.baseUrl,doc,{headers:this.Header}).subscribe(res=>{
      console.log("successfully updated")
    })
  }
  hashedPassword(password:string):string{
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(hashedPassword)
    return hashedPassword;
  }
}
