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

export async function DELETE(req: Request, { params }: { params: { movieId: string } }) {
    // const id = await req.json()
    // console.log(id);    
    // return
    
    const session = await getServerSession(authOptions);
    if (session) {
        const id = params.movieId;
        console.log(id);
        
        if (typeof id !== 'string') {
            throw new Error("Invalid ID");
        }
        if (!id) {
            throw new Error("Invalid ID")
        }
        try {
            const deletemovie = await prismadb.movie.delete({
                where: {
                    id: id
                }
            })
            return NextResponse.json({message: 'Delete success'})
        } catch (error) {
            debugger
            return NextResponse.json({message: error})
        }
    }
}

export async function PUT(req: Request, {params}: {params: {movieId: string}}) {
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
            const {data: movie} = await req.json()
            const updateMovie = await prismadb.movie.update({
                where: {
                    id: id
                },
                data: movie
            });
            if (!updateMovie) {
                throw new Error("Invalid ID")
            }
            return NextResponse.json(updateMovie)
        } catch (error) {
            console.log(error);
            return NextResponse.json(error);
        }
    }
}