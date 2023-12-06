import fs from 'fs'
import path from 'path';
import {promises as fsPromises} from 'fs';





export default async function getNewId(){
   const files=await fsPromises.readdir(path.join(process.cwd(), `/public/patients`))
   files.filter((file) => {return file.endsWith('.json')})
   return (files.length+1).toString();
    
}