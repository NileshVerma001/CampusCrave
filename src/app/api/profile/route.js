import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';


export async function PUT(req) {
    const prisma = new PrismaClient();
    try {
        const data = await req.json();
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        const update={};
        if('name' in data){
            update.name=data.name;
        }
        if('image' in data){

            update.image=data.image;
        }
        if (Object.keys(update).length>0) {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: update,
            });
            return Response.json(updatedUser);
        }

        
    } catch (error) {
       
        return Response.json(error);

    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    const prisma = new PrismaClient();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }

        const email = session.user?.email;
        if (!email) {
            return new Response('Email not found in session', { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response('Internal Server Error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}