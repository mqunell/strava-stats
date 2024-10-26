import { http, HttpResponse } from 'msw';
import { paginate } from '@/lib/utils';
import { mockActivities, mockAthlete, mockStats } from '../mocks/strava';

export const handlers = [
	// GET:/athlete
	// Requires `profile:read_all` scope to get `bikes` and `shoes` fields
	// Returns the currently authenticated athlete
	http.get('https://www.strava.com/api/v3/athlete', async () => {
		return HttpResponse.json(mockAthlete);
	}),

	// GET:/athlete/activities
	// Requires `activity:read_all` scope for private activities
	// Returns up to the most recent 30 of these objects by default
	http.get('https://www.strava.com/api/v3/athlete/activities', async ({ request }) => {
		const url = new URL(request.url);
		const perPage = Number(url.searchParams.get('per_page'));
		const page = Number(url.searchParams.get('page'));

		const paginated = paginate({ data: mockActivities, limit: perPage, page });
		return HttpResponse.json(paginated);
	}),

	// GET:/athletes/{id}/stats
	http.get('https://www.strava.com/api/v3/athletes/*/stats', async () => {
		return HttpResponse.json(mockStats);
	}),
];
