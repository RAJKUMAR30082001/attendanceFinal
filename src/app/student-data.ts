export interface StudentData {
    firstName:string
    middleName:string
    lastName:string
    department:string
    registerNumber:string
    email:string
    password:string
    confirmPassword?:string
}
export interface CouchDBViewResponse {
    total_rows: number;
    offset: number;
    rows: any[];
  }

export interface loginDetails{
    registerNumber:string;
    password:string
}

export interface facultyLogin{
    name:string
    email:string
    password:string
    subject:string
    subjectCode:string
    department:string
    permitted:boolean
}
