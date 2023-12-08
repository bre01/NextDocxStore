"use client"
import React, { useState } from "react";
import type Patient from "interfaces/Patient"
export default function Patient(){
    const [patients,setPatients]=useState<Array<any>>();
    const [query,setQuery]=useState<string>("") 
    const onChangeHandle=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(event.target.value)
    }
    const submitHandle=()=>{
        console.log(query)
        fetch(`/api/patient?query=${query}`,{method:"GET"})
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.message=="failed"){
                alert("try agagin")
            }
            else{
                console.log("suc")
                setPatients(data.filtered)
                console.log(patients)
            }
        })
    } 

    return(
        <>
            <input value={query} onChange={onChangeHandle} ></input>
            <button onClick={submitHandle}>submit </button>
            {patients&&patients.length?
            patients.map((patient,index)=>{return (<div key={index}>{patient}</div>)}):
            <div>no data</div>}

        
        </>
    )
}
