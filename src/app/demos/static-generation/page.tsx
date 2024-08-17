import { Metadata } from 'next';
import { basicMetadata } from '@/lib/basicMetadata';
import { getUsers } from '@/lib/users';

export const metadata: Metadata = basicMetadata('SSG Demo');

// Revalidate the page every 60 seconds for ISR
export const revalidate = 60;

const Page = async () => {
	const users = await getUsers();

	return (
		<>
			<h1 className="text-lg underline">Static Generation</h1>
			<ul>{users && users.map((user) => <li key={user._id}>{user.name}</li>)}</ul>
		</>
	);
};

export default Page;
