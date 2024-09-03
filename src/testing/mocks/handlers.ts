import { delay, http, HttpResponse } from 'msw';

export const handlers = [
	http.get('https://www.strava.com/api/v3/athlete', async () => {
		const mock: ApiAthlete = {
			id: 1,
			firstname: 'Mock',
			lastname: 'User',
			created_at: '2021-08-17T00:00:00.000Z',
			updated_at: '2024-09-02T00:00:00.000Z',
			bikes: [],
			shoes: [],
		};

		return HttpResponse.json(mock);
	}),
	http.get('https://www.strava.com/api/v3/athletes/*/stats', async () => {
		const mock: ApiStats = {
			biggest_ride_distance: 123456,
			biggest_climb_elevation_gain: 200,
			recent_ride_totals: {
				count: 2,
				distance: 78533.7021484375,
				moving_time: 12276,
				elapsed_time: 13978,
				elevation_gain: 140,
			},
			ytd_ride_totals: {
				count: 12,
				distance: 510241,
				moving_time: 82708,
				elapsed_time: 95154,
				elevation_gain: 1317,
			},
			all_ride_totals: {
				count: 74,
				distance: 2912787,
				moving_time: 489979,
				elapsed_time: 565412,
				elevation_gain: 8680,
			},
			recent_run_totals: {
				count: 3,
				distance: 15192.81982421875,
				moving_time: 4902,
				elapsed_time: 4915,
				elevation_gain: 84.39998149871826,
			},
			ytd_run_totals: {
				count: 31,
				distance: 156091,
				moving_time: 52213,
				elapsed_time: 52505,
				elevation_gain: 1793,
			},
			all_run_totals: {
				count: 107,
				distance: 438220,
				moving_time: 152401,
				elapsed_time: 153328,
				elevation_gain: 3979,
			},
		};

		return HttpResponse.json(mock);
	}),
];
