import type Doc from "../../../../interfaces/Doc";
import fs, { link } from 'fs';
import path from 'path';
import {promises as fsPromises} from 'fs';




export async function GET(
    request: Request,
){
    const folderPath = path.join(process.cwd(), `/public/emptytables`);
    try {
        const files = await fsPromises.readdir(folderPath);
        for (const file of files)
          console.log(file);
        const res=files.map((file) => {return{name:file,link:`/emptytables/${file}`}})
        return new Response(JSON.stringify(res))
      } 
    catch (err) {
        console.error(err);
    } 
}
