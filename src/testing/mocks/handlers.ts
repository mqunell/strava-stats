import { delay, http, HttpResponse } from 'msw';

export const handlers = [
	http.get('/api/users', async () => {
		await delay(100);

		const users: User[] = [
			{ _id: '1', name: 'Mock Alice' },
			{ _id: '2', name: 'Mock Bob' },
			{ _id: '3', name: 'Mock Charlie' },
		];

		return HttpResponse.json({ users });
	}),
];
