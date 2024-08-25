import { cookies } from 'next/headers';
import { getCookies } from 'cookies-next';
import { Authenticate } from './Authenticate';

const Home = () => {
	const { accessToken, firstName, profilePicture } = getCookies({ cookies });

	if (!accessToken) {
		return <Authenticate />;
	}

	return (
		<div className="flex flex-col items-center">
			{profilePicture ? <img src={profilePicture} /> : null}
			<p>Hey{firstName ? ` ${firstName}` : ''}! Loading your data now...</p>
		</div>
	);
};

export default Home;
