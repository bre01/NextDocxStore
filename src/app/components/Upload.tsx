"use client"
import { useState } from "react"
import React from "react"
import renameFile from "../../../utils/renameFile"
import  unixToFriendly ,{unixToYearSecond} from "../../../utils/unixToFriendly"

export default function Upload({patientId}:{patientId:string}){
    const id=patientId;
    const [file,setFile]=useState<File>()
    function handleFileChange(e:React.ChangeEvent<HTMLInputElement>){
        setFile(e.target.files![0])
    }
    function handleFileSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData=new FormData()
        const [filename,ext]=file!.name.split(".")
        const timeName=filename+unixToYearSecond(Date.now())+"."+ext
        const renamedFile=renameFile(file!,timeName)
        formData.append("file",renamedFile)
        fetch("/api/patient/"+id,{
            method:"POST",
            body:formData
        })     



        console.log(renamedFile)
    }





    return(
        <>
            <form onSubmit={handleFileSubmit}>
                请上传完成的评估量表
                <input type="file" onChange={handleFileChange}></input> 
                <button type="submit">submit</button>
            </form >
        </>
    )
}