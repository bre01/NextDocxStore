import NoIdPatient from "./NoIdPatient";
import Doc from "./Doc";
export default interface IdAndDocsPatient extends NoIdPatient{
    Id:string,
    docs:Doc[]
}