import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCouchService } from './student-couch.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { CheckValidityService } from './check-validity.service';
import { FaceapiService } from './faceapi.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{
  private bool!:boolean
  constructor(private http:HttpClient,private stdService:StudentCouchService,private navigater:Router,private check:CheckValidityService,private face:FaceapiService) { }
  private baseUrl=`${this.stdService.apiUrl}/Admin`
  private Auth=this.stdService.getHeader()
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
 
   if(this.bool){
    console.log("true")
    return true
   }
   else{
    if(this.check.getAuth()){
      return true
    }
    this.navigater.navigate(['/home'])
    
    return false
   }
  }
  checkAdmin(userName: string, Password: string,descriptor:any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getUrl().subscribe(
       async (data) => {
        console.log(data.LabeledDescritor,data.hours)
          let result=await this.face.adminFaceMatch(data.LabeledDescritor,descriptor)
          if(result.split(" ")[0]==='admin'){
          if (data['username'] === userName && data['password'] === Password) {
            this.check.SetData(data,true)
            resolve(true);
          } else {
            resolve(false);
          }}else{
            resolve(false);
          }
        },
        (error) => {
          // Handle error, for example, by rejecting the promise
          console.error('Error in HTTP request:', error);
          reject(false)
        }
      );
    });
  }
  setValue(isLog:boolean){
    this.bool=isLog
  }
  getUrl():Observable<any>{
    return this.http.get<any>(this.baseUrl, { headers: this.Auth })
  }
  
  updateAdmin(doc:any){
    this.http.put<any>(this.baseUrl,doc,{headers:this.Auth}).subscribe(data=>{
      console.log("successfully updated")
    })
  }
}
