import { NextResponse } from "next/server";
import prismadb from '@/lib/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, {params}: {params: {currentId: string}}) {
    const session = await getServerSession(authOptions);
    if (session) {
        console.log('parrams', params);
        
        const id = params.currentId;
        if (typeof id !== 'string') {
            throw new Error("Invalid ID");
        }
        if (!id) {
            throw new Error("Invalid ID")
        }
        try {
            const { data: user } = await req.json()
            const updateCusomer = await prismadb.user.update({
                where: {
                    id: id
                },
                data: user
            });           
            if (!updateCusomer) {
                throw new Error("Invalid ID")
            }
            return NextResponse.json(updateCusomer)
        } catch (error) {
            console.log(error);
            return NextResponse.json(error);
        }
    }
}