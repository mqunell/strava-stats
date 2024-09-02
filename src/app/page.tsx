import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';
import Authenticate from './Authenticate';
import Loading from './Loading';
import UserData from './UserData';

const Home = () => {
	const { accessToken, firstName, profilePicture } = getCookies({ cookies });

	if (!accessToken) {
		return <Authenticate />;
	}

	return (
		<div className="flex flex-col items-center">
			{profilePicture ? <img src={profilePicture} /> : null}
			<p>Hey{firstName ? ` ${firstName}` : ''}! Loading your data now...</p>
			<Suspense fallback={<Loading />}>
				<UserData accessToken={accessToken} />
			</Suspense>
		</div>
	);
};

export default Home;
