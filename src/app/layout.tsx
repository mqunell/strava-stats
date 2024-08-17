import { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Next.js Template',
	description: 'My customized Next.js template to quickly start future projects',
	icons: {
		icon: '/favicon.ico',
	},
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<body>{children}</body>
	</html>
);

export default RootLayout;
