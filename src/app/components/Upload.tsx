"use client"
import { useState } from "react"
import React from "react"
import renameFile from "../../../utils/renameFile"
import unixToFriendly, { unixToYearSecond } from "../../../utils/unixToFriendly"

export default function Upload({ patientId, fet }: { patientId: string, fet: () => void }) {
    const id = patientId;
    const [file, setFile] = useState<File>()
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files![0])
    }
    function handleFileSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData()
        const [filename, ext] = file!.name.split(".")
        const timeName = filename + unixToYearSecond(Date.now()) + "." + ext
        const renamedFile = renameFile(file!, timeName)
        formData.append("file", renamedFile)
        fetch("/api/patient/" + id, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.message == "success") {
                    alert("success")
                    fet()
                }
            })



        console.log(renamedFile)
    }





    return (
        <>
            <form onSubmit={handleFileSubmit}>
                请上传完成的评估量表
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">选择一个文件</span>
                        <span className="label-text-alt">接收Docx,Excel等修改后的样表文件</span>
                    </div>
                    <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                    <div className="label">
                        <span className="label-text-alt"></span>
                        <span className="label-text-alt"></span>
                    </div>
                </label>
                <button type="submit" className="btn btn-wide">提交样表</button>
            </form >
        </>
    )
}