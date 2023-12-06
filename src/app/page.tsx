import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h3 className="text-6xl font-bold"><Link href="newpatient" >新病人</Link></h3>
        <h3 className="text-6xl font-bold"><Link href="patient">康复管理 </Link></h3>         
      </div>
    </main>
  )
}
