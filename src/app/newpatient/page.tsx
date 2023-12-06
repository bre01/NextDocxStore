"use client";
import React from "react";
import Image from "next/image";
import EmptyTables from "../components/EmptyTables";

export default function NewPatientPage(){
    
    

    return(
       <>
            <h1>New Patient</h1> 
            <form>
                <label htmlFor="input1"></label><input id="input1"></input> 
                <input></input> 
            </form>
            <h1>example tables</h1> 
            <EmptyTables></EmptyTables>

       </>
    )
}