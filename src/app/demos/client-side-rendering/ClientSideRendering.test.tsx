import { render, screen } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { server } from '@/testing/mocks/server';
import ClientSideRendering from './ClientSideRendering';

describe('ClientSideRendering', () => {
	it('renders the users', async () => {
		render(<ClientSideRendering />);
		await screen.findByText(/loading/i);

		await screen.findByText('Mock Alice');
		screen.getByText('Mock Bob');
		screen.getByText('Mock Charlie');
	});

	it('shows an error message if the fetch fails', async () => {
		const newHandlers = [
			http.get('/api/users', async () => {
				await delay(100);
				return new HttpResponse(null, { status: 500 });
			}),
		];
		server.use(...newHandlers);

		render(<ClientSideRendering />);
		await screen.findByText(/loading/i);

		await screen.findByRole('alert', { name: /error/i });
	});
});
