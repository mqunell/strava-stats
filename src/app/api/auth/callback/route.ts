import { NextRequest, NextResponse } from 'next/server'
import { deleteCookie, setCookie } from '@/lib/cookies'

const { CLIENT_ID, CLIENT_SECRET, ROOT_URL } = process.env

const requiredScopes = ['activity:read_all', 'profile:read_all']

export const GET = async (req: NextRequest): Promise<NextResponse> => {
	const { searchParams } = new URL(req.url)
	const authCode = searchParams.get('code')
	const authedScopes = searchParams.get('scope') ?? ''

	if (!requiredScopes.every((scope) => authedScopes.includes(scope))) {
		await setCookie('error', 'The requested scopes must be authorized. Please try again.')
		return NextResponse.redirect(ROOT_URL!)
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
		})

		const stravaData = await stravaRes.json()

		await deleteCookie('error')
		await setCookie('accessToken', stravaData?.access_token)
		await setCookie('firstName', stravaData?.athlete?.firstname)
		await setCookie('profilePicture', stravaData?.athlete?.profile)
	} catch (error) {
		console.error('error with /api/auth/callback', error)
	}

	return NextResponse.redirect(ROOT_URL!)
}
