import type Doc from "../../../../interfaces/Doc"
import type Pd from "../../../../interfaces/Pd"
import fs from 'fs'
import path from 'path';
import unixToFriendly, { unixToYearSecond } from "../../../../utils/unixToFriendly";
import {promises as fsPromises} from 'fs';
import getNewId from "../../../../utils/getNewId";
import {redirect} from"next/navigation"
interface noIdPatient{
    detail:any,
    name:string,
    description:string,
    
}



export async function POST(request:Request,{params}:{params:{id:string}}){
    const id=params.id;
    const body:noIdPatient=await request.json();
    const newId=await getNewId();
    const patient:Pd={detail:body.detail, Id:id, name:body.name, description:body.description, docs:[]}
    redirect(`/patient/{id}`)
}