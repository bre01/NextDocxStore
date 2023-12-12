"use client";
import React from "react";
import Image from "next/image";
import EmptyTables from "../components/EmptyTables";
import { useState } from "react";
import type Pd from "../../../interfaces/Pd";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import NoIdPatient from "interfaces/NoIdPatient";

export default function NewPatientPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<NoIdPatient>({
        name: '',
        gender: '0',
        child: '0',
        info: {basic:"",history:"",recovery:"",other:"",children:"",old:""},
    });
    const reducer=(state:NoIdPatient,action:React.ChangeEvent<HTMLInputElement>)=>{
        return {...state,[action.target.name]:action.target.value}
    }
    //the reducer is not uesed but should be adapted later



    


        
    const handleInputChange = (event: React.ChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
        // Update the state with the new value
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleInFoChange = (event: React.ChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
        // Update the state with the new value
        setFormData({
            ...formData,
            info:{...formData.info,[name]: value},
        });
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("/api/newpatient", {
            method: "POST",
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then(async (data) => {
            if (data.message == "success") {
                console.log("redirect");
                router.push("/patient/" + data.id);
            }
            else if (data.message == "failed") {
                console.log("failed");
                alert("try again");
            }
        });
    };




    return (
        <>
        <div >
            <form onSubmit={handleSubmit} >
                <input className=" input input-bordered w-full max-w-xs m-3"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <div id="patientDetail" className="">

                    <select className="select select-bordered w-full max-w-xs m-3 inline-block"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="0">男</option>
                        <option value="1">女</option>
                    </select>
                    <select className="select select-bordered inline-block w-full max-w-xs m-3 "
                        name="child"
                        value={formData.child}
                        onChange={handleInputChange}
                    >
                        <option value="0">成人</option>
                        <option value="1">儿童</option>
                        <option value="2">老人</option>
                    </select>
                    <div className="m-3 ">
                        <textarea className="textarea textarea-bordered inline-block h-96 w-1/2"
                            name="basic"
                            placeholder="请输入病情描述"
                            value={formData.info.basic}
                            onChange={handleInFoChange}
                        ></textarea>
                        <textarea className="textarea textarea-bordered inline-block h-96 w-1/2"
                            name="history"
                            placeholder="既往病史和过敏症状"
                            value={formData.info.history}
                            onChange={handleInFoChange}
                        ></textarea>
                        <textarea className="textarea textarea-bordered inline-block h-96 w-1/2"
                            name="recovery"
                            placeholder="请输入康复描述"
                            value={formData.info.recovery}
                            onChange={handleInFoChange}
                        ></textarea>
                        <textarea className="textarea textarea-bordered inline-block h-96 w-1/2"
                            name="other"
                            placeholder="其他信息补充"
                            value={formData.info.other}
                            onChange={handleInFoChange}
                        ></textarea>
                        {formData.child=="1"?
                        <textarea className="textarea textarea-bordered inline-block h-96 w-1/2"
                            name="children"
                            placeholder="儿童信息"
                            value={formData.info.children}
                            onChange={handleInFoChange}
                        ></textarea>:<></>}
                        {formData.child=="2"? 
                        <textarea className="textarea textarea-bordered inline-block h-96 w-1/2"
                            name="old"
                            placeholder="老人信息"
                            value={formData.info.old}
                            onChange={handleInFoChange}
                        ></textarea>:<></>}
                    </div>
                </div>
                <div className="flex">
                <button className="btn btn-ml sm:btn-ml md:btn-md lg:btn-lg m-auto justify-center" type="submit">Submit</button>
                </div>
            </form>

        </div>
        </>
    )
}