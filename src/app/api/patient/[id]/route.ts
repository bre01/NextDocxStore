import type Doc from "../../../../../interfaces/Doc"
import type Pd from "../../../../../interfaces/Pd"
import fs from 'fs'
import path from 'path';
import unixToFriendly, { unixToYearSecond } from "../../../../../utils/unixToFriendly";
import {promises as fsPromises} from 'fs';



export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id // 'a', 'b', or 'c'

    const detailPath = path.join(process.cwd(), `/public/patients/${id}.json`);
    //const detail=fsPromises.readFile(detailPath, 'utf8').then((data) => {return JSON.parse(data)}).catch((err) => {console.log(err)}
    const detail= JSON.parse(await fsPromises.readFile(detailPath, 'utf8'))
    const patient:Pd= {Id:`${id}`,detail:detail,name:`${id} name`,description:`${id} des`,docs:[]}
    const folderPath = path.join(process.cwd(), `/public/files/${id}`);
    try {
        const files = await fsPromises.readdir(folderPath);
        for (const file of files)
          console.log(file);
        const res=files.map((file) => {patient.docs.push({name:file,description:"the descript",link:`/files/${id}/${file}`})})
      } 
    catch (err) {
        console.error(err);
    }  
    return new Response(JSON.stringify(patient))
}

export async function POST(request: Request,{ params }: { params: { id: string } }) {
    const id = params.id
    const body = await request.formData()
    const file:File = body.get('file')! as File;
    const doc: Doc = { name: file.name, description:`lastModified: ${unixToYearSecond(file.lastModified)}`, link: `/files/${id}/${file.name}` }  
    const patientsFiles=await fsPromises.readdir(path.join(process.cwd(), `/public/patients`))
    const patients=await Promise.all(patientsFiles.map(async (file) => {return JSON.parse(await fsPromises.readFile(path.join(process.cwd(), `/public/patients/${file}`), 'utf8'))}))   
    const patient= patients.find((patient:Patient) => patient.Id === id)!
    patient.docs.push(doc)
    console.log(patients)
    const folderPath = path.join(process.cwd(), `public/files/${id}`);
    await fs.mkdir(folderPath, {recursive: true}, (err) => {console.log(err)});
    const filePath = path.join(folderPath, doc.name);
    console.log(filePath)
    fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()), (err) => {console.log(err)});
    return new Response(JSON.stringify({ message: "success" }))

}
/*
export async function POST(request:Request,{params}:{params:{id:string}}){
    const id=params.id;
    const body=
}*/