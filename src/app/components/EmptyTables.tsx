import React, { useEffect, useRef } from "react";
import { useState } from "react";
export default function EmptyTables() {
    const [tables, setTables] = useState<{ name: string, link: string }[]>([])
    const alltables=useRef<{ name: string, link: string }[]>([])
    useEffect(() => {
        fetch("/api/emptytables").then((res) => res.json()).then((data) => { setTables(data);alltables.current=data })
    }, [])

    const [query, setQuery] = useState<string>("");
    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        if(event.target.value==""){ 
            setTables(alltables.current);
            return;
        }
        setTables(alltables.current.filter((table) => table.name.includes(event.target.value)))
    }

    return( 
    <>
    <input value={query} onChange={onChangeHandle}></input>
    {tables.length? 
                tables.map((table, index) => {
                    return (
                        <>
                            <div>
                                <span>{table.name} </span>
                                <a href={table.link}> 下载</a>
                            </div>
                        </>
                    )
                })
    
        :<div>loading</div>
    }
    </>)
} // export default function EmptyTables() {