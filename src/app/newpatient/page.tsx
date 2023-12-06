"use client";
import React from "react";
import Image from "next/image";
import EmptyTables from "../components/EmptyTables";
import { useState } from "react";
import type Pd from "../../../interfaces/Pd";

export default function NewPatientPage() {

    const [formData, setFormData] = useState({
        name: '',
        gender: '0',
        child: '0',
        text: '',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update the state with the new value
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/newpatient", {
            method: "POST",
            body: JSON.stringify(formData)
        })
    };




    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <div id="patientDetail" style={{ backgroundColor: 'Red' }}>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="0">男</option>
                        <option value="1">女</option>
                    </select>
                    <select
                        name="child"
                        value={formData.child}
                        onChange={handleInputChange}
                    >
                        <option value="0">成人</option>
                        <option value="1">儿童</option>
                    </select>
                    <div>
                        <textarea
                            name="text"
                            placeholder="请输入病情描述"
                            value={formData.text}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>


        </>
    )
}