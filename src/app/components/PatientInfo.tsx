import type Patient from "../../../interfaces/Patient"
import React from "react";
export default function PatientInfo({patient}:{patient:Patient}){
    return(
        <>
            <div>
                <div>{patient.name}</div>
                <div>{patient.description}</div>
            </div>
        </> 
    )


}