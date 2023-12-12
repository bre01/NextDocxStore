import type Patient from "../../../interfaces/Patient"
import type IdAndDocsPatient from "interfaces/IdAndDocsPatient";
import React from "react";
export default function PatientInfo({patient}:{patient:IdAndDocsPatient}){
    return(
        <>
            <div>
                <div>{patient.name}</div>
                <div>{patient.gender}</div>
                <div>{patient.child}</div>
                <div>{patient.info.basic}</div>
                <div>{patient.info.history}</div>
                <div>{patient.info.recovery}</div>
                <div>{patient.info.other}</div>
                <div>{patient.info.children}</div>
                <div>{patient.info.old}</div>
            </div>
        </> 
    )


}