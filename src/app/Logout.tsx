'use client';

const Logout = ({ action }: { action: () => Promise<void> }) => {
	return (
		<button
			className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-500"
			onClick={async () => await action()}
		>
			Logout
		</button>
	);
};

export default Logout;
