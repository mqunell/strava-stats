import Link from 'next/link';

const Authenticate = () => {
	return (
		<Link
			href="/api/auth"
			className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-500"
		>
			🏃‍➡️ Authenticate with Strava 🚲
		</Link>
	);
};

export default Authenticate;
