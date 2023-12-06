import Doc from './Doc';

export default interface Patient{
    Id:string;
    name:string;
    description:string;
    docs:Doc[];  
}