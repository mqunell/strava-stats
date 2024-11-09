import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const { CLIENT_ID, CLIENT_SECRET, ROOT_URL } = process.env;

const requiredScopes = ['activity:read_all', 'profile:read_all'];

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	const { searchParams } = new URL(req.url);
	const authCode = searchParams.get('code');
	const authedScopes = searchParams.get('scope') ?? '';

	const cookieStore: ReadonlyRequestCookies = await cookies();

	if (!requiredScopes.every((scope) => authedScopes.includes(scope))) {
		cookieStore.set('error', 'The requested scopes must be authorized. Please try again.');
		return NextResponse.redirect(ROOT_URL!);
	}

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
				code: authCode,
			}),
		});

		const stravaData = await stravaRes.json();

		cookieStore.delete('error');
		cookieStore.set('accessToken', stravaData?.access_token, { maxAge: 60 * 60 * 2 });
		cookieStore.set('firstName', stravaData?.athlete?.firstname, { maxAge: 60 * 60 * 2 });
		cookieStore.set('profilePicture', stravaData?.athlete?.profile, { maxAge: 60 * 60 * 2 });
	} catch (error) {
		console.error('error with /api/auth/callback', error);
	}

	return NextResponse.redirect(ROOT_URL!);
};
