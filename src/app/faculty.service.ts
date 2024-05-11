import { Injectable } from '@angular/core';
import { StudentCouchService } from './student-couch.service';
import { facultyLogin } from './student-data';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Observable, map } from 'rxjs';
import { CheckValidityService } from './check-validity.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  // Base URL for faculty data
  private baseUrl = `${this.stdService.apiUrl}/faculty`;

  // API URL
  private apiUrl = this.stdService.apiUrl;

  // HTTP headers for requests
  private Header = this.stdService.getHeader();

  // Current year
  year = new Date().getFullYear();

  constructor(private stdService: StudentCouchService, private http: HttpClient,private check:CheckValidityService,private route:Router) { }

  // Method to update or insert faculty data
  putData(data: facultyLogin, errorMessage: HTMLDivElement) {
    console.log("coming");

    let email: string = data.email;
    let subjectCode: string = data.subjectCode;
    let department: string = data.department;
    let subject: string = data.subject;
    let employeeId:number=data.employeeId

    this.http.get<any>(this.baseUrl, { headers: this.Header }).subscribe((res) => {
      // Check if department data exists
      if (res[department]) {
        let details = res[department];

        // Check if email already exists in department data
        if (details[email]) {
          errorMessage.innerHTML = "Email already exists";
          return;
        }

        // Check if email already exists in student data
        this.stdService.getFullDocument().subscribe(data => {
          let stdData = data[String(this.year)];
          let keys = Object.keys(stdData).filter(key => stdData[key].email === email);
          if (keys.length > 0) {
            errorMessage.innerHTML = "Email already exists in student data";
            return
          }
        });

        console.log(details);

        let key = Object.keys(details);
        console.log(key);

        // Check if subjectCode or subject already exists
        let subjectCodeExist = key.some(keys => details[keys].subjectCode === subjectCode);
        let subjectExist = key.some(keys => details[keys].subject === subject);
        let employeeIdExist=key.some(keys=>details[keys].employeeId===employeeId)

        if (subjectCodeExist) {
          errorMessage.innerHTML = "Subject code already exists";
          return;
        }

        if (subjectExist) {
          errorMessage.innerHTML = "Subject already exists";
          return;
        }
        if(employeeIdExist){
          errorMessage.innerHTML="employeeId already exists"
          return
        }

        // Add faculty data to existing department
        details[email] = data;
        this.updateDocument(res);

        errorMessage.innerHTML = "Registered Successfully Wait for Admin Approval";

        setTimeout(()=>{
          this.route.navigate(['/home'])
        },2000)

        errorMessage.innerHTML="Registered Successfully Wait For Admin Approval"
        setTimeout(() => {
          this.route.navigate(['/home'])
        }, 3000);
       

      } else {
        // Create new department data
        res[department] = {
          [email]: data
        };
        this.updateDocument(res);

        errorMessage.innerHTML = "Registered Successfully Wait for Admin Approval";

        setTimeout(()=>{
          this.route.navigate(['/home'])
        },2000)

        errorMessage.innerHTML="Registered Successfully Wait For Admin Approval"
        setTimeout(() => {
          this.route.navigate(['/home'])
        }, 3000);

      }
    });
  }

  // Method to update CouchDB document
  updateDocument(doc: any) {
    this.http.put(this.baseUrl, doc, { headers: this.Header }).subscribe(res => {
      console.log("Successfully updated");
    });
  }

  // Method to hash password using SHA256
  hashedPassword(password: string): string {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(hashedPassword);
    return hashedPassword;
  }

  // Method to check login credentials
  loginCheck(email: string, password: string, errorMessage: HTMLDivElement) {
    this.http.get<any>(this.getViewUrl(email,"facultylogin"), { headers: this.Header }).subscribe(data => {
      if (data.rows.length === 0) {
        errorMessage.innerHTML = "Enter valid email";
        return;
      } else {
        let permit = data.rows[0].value.permitted;
        console.log(permit)
        if (!permit) {
          errorMessage.innerHTML = 'You are not authenticated';
          return;
        } else {
          let passHashed = data.rows[0].value.password;
          if (this.hashedPassword(password) === passHashed) {
            this.check.SetData(data['rows'][0].value);
            this.route.navigate(['/facultyHome'])
          } else {
            errorMessage.innerHTML = "Enter correct password";
          }
        }
      }
    });
  }

  // Method to generate the URL for fetching faculty data based on email
  getViewUrl(data: string,view:string): string {
    return `${this.apiUrl}/_design/views/_view/${view}?key="${data}"`;
  }

  getFacultyData():Observable<any>{
    return this.http.get<any>(this.baseUrl,{headers:this.Header}).pipe(
      map(data=> data['mca'])
    )
  }
  getFullDocument():Observable<any>{
    return this.http.get<any>(this.baseUrl, { headers: this.Header })
  }
  facultyForLetter(data:string='22ca022'):Observable<any>{
    const doc=this.getViewUrl(data,'getFaculty')
    return this.http.get<any>(doc,{headers:this.Header})
  }
}
