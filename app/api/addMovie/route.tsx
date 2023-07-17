import { getServerSession } from "next-auth";

import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";


export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if(session) {
        try {
            const data = await req.json()
            // const addMovie = await prismadb.movie.create({)
            const movie = await prismadb.movie.create(data)
            return NextResponse.json({ message: 'Add movie success' , movie }, { status: 200 })
  
        } catch (error) {
            console.log(error);
            return new Response('Error')
        }
    }
}