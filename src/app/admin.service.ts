import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCouchService } from './student-couch.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate{
  private bool!:boolean
  constructor(private http:HttpClient,private stdService:StudentCouchService,private navigater:Router) { }
  private baseUrl=`${this.stdService.apiUrl}/Admin`
  private Auth=this.stdService.getHeader()
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
 
   if(this.bool){
    console.log("true")
    return true
   }
   else{
    this.navigater.navigate(['/home'])
    // console.log(username)
    return false
   }
  }
  checkAdmin(userName: string, Password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>(this.baseUrl, { headers: this.Auth }).subscribe(
        (data) => {
        
          if (data['username'] === userName && data['password'] === Password) {
            console.log("find")
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          // Handle error, for example, by rejecting the promise
          console.error('Error in HTTP request:', error);
          reject(false);
        }
      );
    });
  }
  setValue(isLog:boolean){
    this.bool=isLog
  }
}
