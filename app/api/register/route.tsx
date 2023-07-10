import bcrypt from 'bcrypt';
import prismadb from '../../../lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request,) {

    if (req.method !== 'POST') {
        return NextResponse.json({ error: '' }, { status: 405 })
    }

    try {
        const { email, name, password } = await req.json();
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        })
        if (existingUser) {
            // return new Response("Email exist")
            return NextResponse.json({ error: 'Email already exit' }, { status: 422 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        })

        return NextResponse.json({ message: 'Create account success' , user }, { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Error')
    }
}