'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import useCurrentUser from "@/hooks/useCurrentUser"
import {BiArrowBack} from 'react-icons/bi'
import { useRouter } from "next/navigation"
import Table from "@/components/admin/Table"
import SideBar from "@/components/admin/Sidebar"

export default function Admin() {
    const router = useRouter()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth')
        },
    })
    const { data: user } = useCurrentUser()

    if (user && user?.role !== "ADMIN") {
        console.log("You need to be an admin");
        redirect('/home')
    }
    return (
        <div className="relative">
            <p className="text-white flex absolute right-10 gap-5 hover:text-green-500" onClick={() => router.push('/home')}>
                <BiArrowBack size={30} className="" />
                <span>GO TO HOME</span>
            </p>
            <SideBar/>
            <Table/>
        </div>
    )
}