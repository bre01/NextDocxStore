"use client"
import type Doc from "../../../../interfaces/Doc"
import type Patient from "../../../../interfaces/Patient"
import { useParams } from "next/navigation"

import React, { use, useEffect } from "react"
import { useState } from "react"
import PatientInfo from "@/app/components/PatientInfo"
import Upload from "@/app/components/Upload"
import EmptyTables from "@/app/components/EmptyTables"
export default function Patient() {
    const id = useParams().id
    const [patient, setPatient] = useState<Patient>()
    const fetchPatient = () => {
        fetch("/api/patient/" + id)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPatient(data);
            })
    }
    useEffect(
        fetchPatient
        , [])
    if (!patient) {
        return (
            <>
                <div>
                    Loading
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div>
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <div className="stat-title">就诊次数</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title">进行中的康复方案</div>
                            <div className="stat-value text-secondary">2.6M</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">86%</div>
                            <div className="stat-title">康复进度</div>
                            <div className="stat-desc text-secondary">31 tasks remaining</div>
                        </div>

                    </div>

                    <PatientInfo patient={patient}></PatientInfo>
                    <div className="join join-vertical w-full">
                        {patient.docs.length ? patient.docs.map((doc, index) => {
                            return (<><div className="collapse collapse-arrow join-item border border-base-300">
                                <div  className="collapse-title text-xl font-medium" ><span>{doc.name}</span> <span><a key={index} href={doc.link}>Click to download</a></span></div>
                                <div className="collapse-content">{doc.description}</div>
                            </div></>)
                        }) : "No docs"}
                    </div>
                    <Upload patientId={patient.Id} fet={fetchPatient}></Upload>
                    <EmptyTables></EmptyTables>

                </div>

            </>)


    }






}