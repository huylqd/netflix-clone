import { getSession, useSession} from 'next-auth/react'
import prismadb from './prismadb'
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

const serverAuth = async (req: Request) => {
    const session = await getServerSession(authOptions);
    
    if(!session?.user?.email) {
        throw new Error('Not signed in');
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!currentUser) {
        throw new Error('Not signed in')
    }

    return { currentUser }
}

export default serverAuth