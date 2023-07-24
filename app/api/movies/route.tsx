import { getServerSession } from "next-auth";

import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const movies = await prismadb.movie.findMany();
            console.log(movies);
            return NextResponse.json(movies);
        } catch (error) {
            return NextResponse.json(error)
        }
    }
}
