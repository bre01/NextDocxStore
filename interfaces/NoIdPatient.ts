import type PatientBaisc from "./PatientBasic";
export default interface NoIdPatient extends PatientBaisc{
   info:{basic:string,history:string,recovery:string,other:string,children:string,old:string},
}