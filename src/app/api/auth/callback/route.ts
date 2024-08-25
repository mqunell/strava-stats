import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const { CLIENT_ID, CLIENT_SECRET, ROOT_URL } = process.env;

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get('code'); // Strava authorization code

	try {
		const stravaRes = await fetch('https://www.strava.com/oauth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				grant_type: 'authorization_code',
				code,
			}),
		});

		const stravaData = await stravaRes.json();

		cookies().set('accessToken', stravaData?.access_token /* , { maxAge: 60 * 60 * 2 } */);
		cookies().set('firstName', stravaData?.athlete?.firstname);
		cookies().set('profilePicture', stravaData?.athlete?.profile);
	} catch (error) {
		console.error('error with /api/auth/callback', error);
	}

	return NextResponse.redirect(ROOT_URL!);
};
