import { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'Strava Stats',
	description: 'Expanded stats for Strava',
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
