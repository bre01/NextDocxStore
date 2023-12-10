import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
      <div>
<div className="hero min-h-screen" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?q=80&w=3874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">管理</h1>
      <p className="mb-5">通过我们先进的康复管理系统，医疗行业工作者可以快速的进行康复管理</p>
         <button className="btn glass"><Link href="newpatient" >新病人</Link></button>      
         <button className="btn glass"><Link href="patient">康复管理 </Link></button>      
    </div>
  </div>
</div>
      </div>
  )
}
