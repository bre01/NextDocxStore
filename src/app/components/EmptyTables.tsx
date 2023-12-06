import React, { useEffect } from "react";
import { useState } from "react";
export default function EmptyTables() {
    const [tables,setTables]=useState<{name:string,link:string}[]>([])
    useEffect(()=>{
        fetch("/api/emptytables").then((res)=>res.json()).then((data)=>{setTables(data)}
        )
    },[]) 

    if(tables.length){
        return(
            <>
            {tables.map((table,index)=>{
                return(
                    <>
                        <div>
                            <div>{table.name}</div>
                            <a href={table.link}>Click to download</a>
                        </div>
                    </>
                )
            })}
            </>
        ) 
    }
    else{
        return <div>loading</div>
    }



  return <div></div>;
} // export default function EmptyTables() {