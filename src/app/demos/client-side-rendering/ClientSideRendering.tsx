'use client';

import { useEffect, useState } from 'react';

const ClientSideRendering = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();

	useEffect(() => {
		fetch('/api/users')
			.then((res) => res.json())
			.then((data) => setUsers(data.users))
			.catch((error) => setError(error))
			.finally(() => setLoading(false));
	}, []);

	const output = () => {
		if (loading) {
			return <p>Loading...</p>;
		}

		if (error) {
			return (
				<p role="alert" aria-label="Error">
					Error fetching users
				</p>
			);
		}

		return users.map(({ name }) => <p key={name}>{name}</p>);
	};

	return (
		<>
			<h1 className="text-lg underline">Client-side Rendering</h1>
			<p>Use fetch, useEffect, and useState to retrieve data from `/api/users`:</p>
			{output()}
		</>
	);
};

export default ClientSideRendering;
