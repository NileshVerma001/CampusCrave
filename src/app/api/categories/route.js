import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { name } = await req.json();
        
        if (!name || typeof name !== 'string' || !name.trim()) {
            return NextResponse.json({ error: "Invalid category name" }, { status: 400 });
        }

        const res = await prisma.category.create({
            data: { name: name.trim() }
        });

        return NextResponse.json(res, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}