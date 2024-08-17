import Link from 'next/link';

const links = [
	{ text: 'Static Generation', url: '/demos/static-generation' },
	{ text: 'Server-side Rendering', url: '/demos/server-side-rendering' },
	{ text: 'Client-side Rendering', url: '/demos/client-side-rendering' },
];

const Home = () => (
	<div className="flex flex-col gap-2 p-8">
		{links.map(({ text, url }) => (
			<Link key={url} href={url} className="text-blue-500 hover:underline">
				{text}
			</Link>
		))}
	</div>
);

export default Home;
