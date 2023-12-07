import React, { useEffect } from "react";
import { useState } from "react";
export default function EmptyTables() {
    const [tables, setTables] = useState<{ name: string, link: string }[]>([])
    let alltables;
    useEffect(() => {
        fetch("/api/emptytables").then((res) => res.json()).then((data) => { setTables(data);alltables=data })
    }, [])

    const [query, setQuery] = useState<string>("");
    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        if(event.target.value==""){ 
            setTables(alltables);
            return;
        }
        setTables(tables.filter((table) => table.name.includes(event.target.value)))
    }

    return( 
    <>
    <input value={query} onChange={onChangeHandle}></input>
    {tables.length? 
                tables.map((table, index) => {
                    return (
                        <>
                            <div>
                                <div>{table.name}</div>
                                <a href={table.link}>Click to download</a>
                            </div>
                        </>
                    )
                })
    
        :<div>loading</div>
    }
    </>)
} // export default function EmptyTables() {