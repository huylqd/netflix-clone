import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET(req: Request, { params }: { params: { movieId: string } }) {
    const session = await getServerSession(authOptions);
    if (session) {
        const id = params.movieId;
        if (typeof id !== 'string') {
            throw new Error("Invalid ID");
        }
        if (!id) {
            throw new Error("Invalid ID")
        }
        try {
            const movie = await prismadb.movie.findUnique({
                where: {
                    id: id
                }
            })
            if (!movie) {
                throw new Error("Invalid ID")
            }
            return NextResponse.json(movie)
        } catch (error) {
            return NextResponse.json(error);
        }
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) { 
       
        try {
            const id = await req.json()
            const movie = await prismadb.movie.delete({
                where: {
                    id: id
                }
            })
            return NextResponse.json({message: 'Delete success'})
        } catch (error) {
            console.log(error);
            return new Response('Error')
        }
    }
}