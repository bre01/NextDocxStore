"use client";
import React from "react";
import Image from "next/image";
import EmptyTables from "../components/EmptyTables";
import { useState } from "react";
import type Pd from "../../../interfaces/Pd";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function NewPatientPage() {
    const router=useRouter();
    const [formData, setFormData] = useState({
        name: '',
        gender: '0',
        child: '0',
        text: '',
    });
    const handleInputChange = (event:React.ChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
        // Update the state with the new value
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("/api/newpatient", {
            method: "POST",
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then(async (data) => {
            if (data.message=="success") {
                console.log("redirect");
                router.push("/patient/"+data.id);
            }
            else if(data.message=="failed"){
                console.log("failed");
                alert("try again");
            }
        });
    };




    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="input input-bordered w-full max-w-xs"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <div id="patientDetail" style={{ backgroundColor: 'Red' }}>


                    <select className="select select-bordered w-full max-w-xs"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="0">男</option>
                        <option value="1">女</option>
                    </select>
                    <select className="select select-bordered w-full max-w-xs"
                        name="child"
                        value={formData.child}
                        onChange={handleInputChange}
                    >
                        <option value="0">成人</option>
                        <option value="1">儿童</option>
                    </select>
                    <div>
                        <textarea className="textarea textarea-bordered"
                            name="text"
                            placeholder="请输入病情描述"
                            value={formData.text}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" type="submit">Submit</button>
            </form>


        </>
    )
}