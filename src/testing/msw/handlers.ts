import { http, HttpResponse } from 'msw';
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
	// Returns up to 30 of these objects
	http.get('https://www.strava.com/api/v3/athlete/activities', async () => {
		return HttpResponse.json(mockActivities);
	}),

	// GET:/athletes/{id}/stats
	http.get('https://www.strava.com/api/v3/athletes/*/stats', async () => {
		return HttpResponse.json(mockStats);
	}),
];
