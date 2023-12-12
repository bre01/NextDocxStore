import type Patient from "../../../interfaces/Patient"
import type IdAndDocsPatient from "interfaces/IdAndDocsPatient";
import React from "react";
export default function PatientInfo({ patient }: { patient: IdAndDocsPatient }) {
    return (
        <>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <div >{patient.name}</div>
                        <div>{patient.gender}</div>
                        <div>{patient.child}</div>
                        <div>{patient.info.basic}</div>
                        <div>{patient.info.history}</div>
                        <div>{patient.info.recovery}</div>
                        <div>{patient.info.other}</div>
                        <div>{patient.info.children}</div>
                        <div>{patient.info.old}</div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">修改信息</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}