import type Doc from "interfaces/Doc"
import type Pd from "interfaces/Pd"
import fs from 'fs'
import path from 'path';
import unixToFriendly, { unixToYearSecond } from "utils/unixToFriendly";
import {promises as fsPromises} from 'fs';
import { NextRequest } from "next/server";





export async function GET(
    request: NextRequest,
){
    const query=request.nextUrl.searchParams.get("query")
    const folderPath = path.join(process.cwd(), `/public/patients`);
    try {
        const files = await fsPromises.readdir(folderPath);
        const res=files.map((file) => {return{name:file,link:`/emptytables/${file}`}})
        const filtered=files.filter(file=>fileterPatient(file,query!))
        return new Response(JSON.stringify(filtered))
      } 
    catch (err) {
        console.error(err);
    } 
}

const fileterPatient=async (file:string,query:string)=>{
    
    
    const newPath = path.join(process.cwd(), `/public/patients/`);
    const detail= await JSON.parse(await fsPromises.readFile(newPath+file, 'utf8'))
    if(detail.name.includes(query) || detail.description.includes(query)){
        return true;
    }
    else{
        return false;
    }

}