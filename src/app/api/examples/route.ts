import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const name = searchParams.get('name');

	return NextResponse.json(name);
};

export const POST = async (req: Request) => {
	const body = await req.json();
	const { name } = body;

	return NextResponse.json(name);
};
