"use client"
import React, { useState } from "react";
import type Patient from "interfaces/Patient"
export default function Patient(){
    const [patients,setPatients]=useState<Array<Patient>>();
    const [query,setQuery]=useState<string>("") 
    const onChangeHandle=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(event.target.value)
    }
    const submitHandle=()=>{
        fetch(`http://localhost:3000/patient?query=${query}`)
        .then(res=>res.json())
        .then((data:Array<Patient>)=>{
            setPatients(data)
        })
    } 

    return(
        <>
            <input value={query} onChange={onChangeHandle} ></input>
            <button onClick={submitHandle}>submit </button>
            {patients&&patients.length?patients.map((patient,index)=>{<div><div>{patient.Id}</div><div>{patient.name}</div></div>}):
            <div>no data</div>}

        
        </>
    )
}
