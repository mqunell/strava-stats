import { Metadata } from 'next';

export const basicMetadata = (text: string): Metadata => ({
	title: text,
	description: text,
	icons: {
		icon: '/favicon.ico',
	},
});
