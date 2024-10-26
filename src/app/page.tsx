import { Suspense } from 'react';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import Authenticate from './Authenticate';
import Loading from './Loading';
import Logout from './Logout';
import UserData from './UserData';

const MOCK_TOKEN = process.env.ENABLE_MOCKS === 'true' && 'MOCK_TOKEN';

const Home = () => {
	const cookieStore: ReadonlyRequestCookies = cookies();
	const getCookie = (cookieName: string): string | undefined => cookieStore.get(cookieName)?.value;

	const error = getCookie('error');
	const accessToken = getCookie('accessToken') || MOCK_TOKEN;
	const firstName = getCookie('firstName');
	const profilePicture = getCookie('profilePicture');

	if (!accessToken) {
		return (
			<section className="flex h-screen w-screen flex-col items-center justify-center">
				{error && <p>{error}</p>}
				<Authenticate />
			</section>
		);
	}

	return (
		<section className="flex flex-col items-center p-6">
			{profilePicture ? <img src={profilePicture} /> : null}
			<p>Hey{firstName ? ` ${firstName}` : ''}!</p>
			<Suspense fallback={<Loading />}>
				<UserData accessToken={accessToken} />
			</Suspense>

			<Logout
				action={async () => {
					'use server';
					const cookieStore: ReadonlyRequestCookies = cookies();
					cookieStore.delete('accessToken');
					cookieStore.delete('firstName');
					cookieStore.delete('profilePicture');
				}}
			/>
		</section>
	);
};

export default Home;
