import React, { useEffect, useRef } from "react";
import { useState } from "react";
export default function EmptyTables() {
    const [tables, setTables] = useState<{ name: string, link: string }[]>([])
    const alltables = useRef<{ name: string, link: string }[]>([])
    useEffect(() => {
        fetch("/api/emptytables").then((res) => res.json()).then((data) => { setTables(data); alltables.current = data })
    }, [])
    const [showNumber,setShowNumber]=useState<number>(5)

    const [query, setQuery] = useState<string>("");
    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        if (event.target.value == "") {
            setTables(alltables.current);
            return;
        }
        setTables(alltables.current.filter((table) => table.name.includes(event.target.value)))
    }
    const showAll=()=>setShowNumber(tables.length);

    return (
        <>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">下载评估量表样本</span>
                    <span className="label-text-alt">请输入样表关键词</span>
                </div>
                <input value={query} onChange={onChangeHandle} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                
            </label>
            <button className="btn btn-wide" onClick={showAll}>显示全部样表</button>
            <div className=" w-6/12">
                <div className="table">
                    {tables.length ?
                        tables.slice(0,showNumber).map((table, index) => {
                            return (
                                <>
                                    <thead>
                                        <tr>
                                            <th>{table.name} </th>
                                            <th><a href={table.link}> 下载</a></th>
                                        </tr>
                                    </thead>
                                </>
                            )
                        })

                        : <div>loading</div>
                    }
                </div>
            </div>
        </>)

} // export default function EmptyTables() {