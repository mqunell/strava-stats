import { NextResponse } from 'next/server';
import { stringify } from 'querystring';

const { CLIENT_ID, ROOT_URL } = process.env;

export const GET = async (): Promise<NextResponse> => {
	return NextResponse.redirect(
		'http://www.strava.com/oauth/authorize?' +
			stringify({
				client_id: CLIENT_ID,
				response_type: 'code',
				redirect_uri: `${ROOT_URL}api/auth/callback`,
				approval_prompt: 'force',
				scope: 'profile:read_all,activity:read_all',
			}),
	);
};
