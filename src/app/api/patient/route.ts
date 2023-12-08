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
    console.log(query)
    const folderPath = path.join(process.cwd(), `/public/patients`);
    try {
        const files = await fsPromises.readdir(folderPath);
        const res=files.map((file) => {return{name:file,link:`/emptytables/${file}`}})
        //const filtered=await files.filter(async file=>fileterPatient(file,query!))

        const filterBool=await Promise.all(files.map(async file=>{return {file,filterB:await fileterPatient(file,query!)}}))
        
        
        const filtered=filterBool.filter(file=>file.filterB==true).map(file=>file.file)

        console.log("-----------")
        console.log(filtered)
        console.log("-----------")
        return new Response(JSON.stringify({message:"success",filtered}))
      } 
    catch (err) {
        console.error(err);
        return new Response(JSON.stringify({messge:"failed"}))
    } 
}

const fileterPatient=async (file:string,query:string)=>{
    
    const newPath = path.join(process.cwd(), `/public/patients/`);
    const detail= await JSON.parse(await fsPromises.readFile(newPath+file, 'utf8'))
    if(detail.name.includes(query) ){
        console.log("true")
        return true;
    }
    else{
        return false;
    }

}