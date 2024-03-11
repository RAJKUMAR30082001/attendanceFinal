import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouchDBViewResponse, StudentData, loginDetails } from './student-data';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { CheckValidityService } from './check-validity.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StudentCouchService {

  readonly baseURL = 'http://localhost:5984/studentdatabase/studentDetails';
  readonly apiUrl="http://localhost:5984/studentdatabase"
  readonly username = 'rajkumar';
  readonly password = 'rajraina45';
  public year=new Date().getFullYear()

  constructor(private http: HttpClient,private router:Router,private check:CheckValidityService) { }
 

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    });
  }
  getFullDocument():Observable<any>{
    return this.http.get<any>(this.baseURL, { headers: this.getHeader() })
  }
  putDocuments(details: StudentData, year: number,DivElement?:HTMLDivElement) {
    let email: string = details.email;
    let registerNumber: string = details.registerNumber;

    this.getFullDocument()
      
      .subscribe(data => {
        try {
          
          if (data[year]) {
            const studentData = data[year];
            if (studentData[registerNumber]) {
              console.log("exist")
              if(DivElement)
              DivElement.innerHTML += "Registration number already exists";
              return;
            }

            const studentKeys = Object.keys(studentData);
            const emailExists = studentKeys.some(key => studentData[key].email === email);

            if (emailExists) {
              if(DivElement)
              {
              let val=DivElement.innerHTML
              DivElement.innerHTML +=`${val} <br> Email already exists` ;
              }
              return;
            }

            studentData[registerNumber] = details;
            this.updateDocument(data)
          } 
          else {
            // Academic year does not exist, create it and add the student details inside it
            data[year] = {
              [registerNumber]: details
            };
            this.updateDocument(data);
          }
        } catch (error) {
          console.error('Error processing student details:', error);
        }
      });
  }

  updateDocument(data: any) {
    
    this.http.put(this.baseURL, data, { headers: this.getHeader() }).subscribe(
        (response: any) => {
          console.log('Student details added/updated successfully:', response);
        })
  }
  login(LoginDetails:loginDetails,errorMessage:HTMLDivElement) {
    const registerNumber=LoginDetails.registerNumber? LoginDetails.registerNumber : '';
    const password=this.hashedPassword(LoginDetails.password)
    // const password=LoginDetails.password
    const url = this.getViewUrl(registerNumber);
  
    this.http.get<CouchDBViewResponse>(url, { headers: this.getHeader() })
      .subscribe(response=> {
        // Handle the response data here
        if(response.rows.length===0){
          errorMessage.innerHTML="Enter valid Register number"
          return
        }
        else{
        const val=response.rows[0].value.password;
        console.log(val)
  
        // Check if the password matches
        const student = response['rows'][0]?.value;
        if (student && student.password === password) {
          this.check.SetData(student)
          // Perform further actions for a successful login
        } else {
          errorMessage.innerHTML='Invalid password';
          return
          // Handle invalid credentials
        }
      }
      }, error => {
        // Handle errors here
        console.error(error);
      });
  }
  getViewUrl(RegisterNumber:string):string{
    return `${this.apiUrl}/_design/views/_view/login?key="${RegisterNumber}"`
  }
  faceUpdate(LabeledDescriptor:any,RegisterNumber:string,year:number){
    this.getFullDocument()
    .subscribe(response => {
      const yearOfStudent=response[year]
      if(yearOfStudent){
        const detailsOfRegisterNo=yearOfStudent[RegisterNumber]
        if(detailsOfRegisterNo){
          detailsOfRegisterNo["LabeledDescritor"]=LabeledDescriptor
          this.updateDocument(response)
        }
      }
    })
  
  }
  hashedPassword(password:string):string{
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(hashedPassword)
    return hashedPassword;
  }

  getRequiredData(): Observable<any> {
    return this.getFullDocument().pipe(
      map(data => data[this.year]),
      catchError(error => {
        // Handle the error if needed
        console.error('Error fetching admin data:', error);
        return of(null); 
      })
    );
  }

  
}
