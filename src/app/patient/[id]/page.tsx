"use client"
import type Doc from "../../../../interfaces/Doc"
import type Patient from "../../../../interfaces/Patient"
import { useParams } from "next/navigation"

import React, { use, useEffect } from "react"
import { useState } from "react"
import PatientInfo from "@/app/components/PatientInfo"
import Upload from "@/app/components/Upload"
import EmptyTables from "@/app/components/EmptyTables"
export default function Patient(){
    const id=useParams().id
    const [patient,setPatient]=useState<Patient>()
    const fetchPatient=()=>{
        fetch("/api/patient/"+id)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setPatient(data);
        })
    }
    useEffect(
        fetchPatient
        ,[])
    if(!patient){
        return(
            <>
                <div>
                    Loading
                </div>
            </>
        )
    }
    else{
        return(
            <>
                <div>

                    <PatientInfo patient={patient}></PatientInfo>                
                    <EmptyTables></EmptyTables>
                    <div>
                    {patient.docs.length?patient.docs.map((doc,index)=>{
                         return (<><div style={{backgroundColor:"blue"}}>
                                    <div>{doc.name}</div>
                                    <div>{doc.description}</div>
                                     <a key={index} href={doc.link}>Click to download</a>
                         </div></>)
                    }):"No docs"}
                    </div>
                    <Upload patientId={patient.Id} fet={fetchPatient}></Upload>
                   
                </div>
            
            </>)
        
        
    }




    
   
}