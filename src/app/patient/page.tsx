"use client"
import React, { useState } from "react";
import type Patient from "interfaces/Patient"
export default function Patient() {
    const [patients, setPatients] = useState<Array<any>>();
    const [query, setQuery] = useState<string>("")
    const onChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }
    const submitHandle = () => {
        console.log(query)
        fetch(`/api/patient?query=${query}`, { method: "GET" })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data.message == "failed") {
                    alert("try agagin")
                }
                else {
                    console.log("suc")
                    setPatients(data.filtered)
                    console.log(patients)
                }
            })
    }

    return (
        <>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">搜索病人</span>
                    <span className="label-text-alt">ID，电话，名字</span>
                </div>
                <input value={query} onChange={onChangeHandle} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                {patients && patients.length ?
                    patients.map((patient, index) => { return (<div key={index}>{patient}</div>) }) :
                    <div>no data</div>}
                <button onClick={submitHandle}>submit </button>

            </label>

        </>
    )
}
