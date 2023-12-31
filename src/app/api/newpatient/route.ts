import type Pd from "interfaces/Pd"
import Doc from "interfaces/Doc"
import fs from 'fs'
import path from 'path';
import unixToFriendly, { unixToYearSecond } from "../../../../utils/unixToFriendly";
import {promises as fsPromises} from 'fs';
import getNewId from "../../../../utils/getNewId";
import {redirect} from"next/navigation"
import NoIdPatient from "interfaces/NoIdPatient";
import IdAndDocsPatient from "interfaces/IdAndDocsPatient";



export async function POST(request:Request,{params}:{params:{id:string}}){
    const id=await getNewId();
    const body:NoIdPatient=await request.json();
    const newId=await getNewId();
    const patient:IdAndDocsPatient={...body,Id:id,docs:[]}
    const folderPath = path.join(process.cwd(), `public/patients`); 
    try{
        const filename=path.join(folderPath,`${id}.json`)
        const jsonData=JSON.stringify(patient)
        await fsPromises.writeFile(filename,jsonData)
        console.log("success")
        return new Response(JSON.stringify({message:"success",id:id}))
    }
    catch(err){
        console.log(err)
        return new Response(JSON.stringify({message:"failed"}));
    }

}