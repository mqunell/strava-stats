import { http, HttpResponse } from 'msw';

export const handlers = [
	http.get('https://www.strava.com/api/v3/athlete', async () => {
		const mock: ApiAthlete = {
			id: 1,
			firstname: 'Mock',
			lastname: 'User',
			created_at: '2021-08-17T00:00:00.000Z',
			updated_at: '2024-09-02T00:00:00.000Z',
			bikes: [
				{
					id: 'b11055279',
					name: 'Bicyclysseus',
					distance: 2789621,
					converted_distance: 1733.4,
				},
				{
					id: 'b11447707',
					name: "Dad's bike",
					distance: 68654,
					converted_distance: 42.7,
				},
			],
			shoes: [
				{
					id: 'g15117495',
					name: 'Nike Pegasus 40',
					distance: 241306,
					converted_distance: 149.9,
				},
				{
					id: 'g11177469',
					name: 'Brooks Adrenaline GTS 20',
					distance: 625647,
					converted_distance: 388.8,
				},
			],
		};

		return HttpResponse.json(mock);
	}),
	http.get('https://www.strava.com/api/v3/athlete/activities', async () => {
		const mock: ApiActivity[] = [
			{
				name: 'Green River B',
				distance: 39816.1,
				moving_time: 5896,
				elapsed_time: 7263,
				total_elevation_gain: 83.4,
				type: 'Ride',
				id: 12319844941,
				start_date: '2024-09-03T21:49:49Z',
				start_date_local: '2024-09-03T14:49:49Z',
				athlete_count: 1,
				gear_id: 'b11055279',
				average_speed: 6.753,
				max_speed: 10.514,
				average_heartrate: 136.0,
				max_heartrate: 176.0,
				elev_high: 18.6,
				elev_low: 6.4,
			},
			{
				name: 'Afternoon Walk',
				distance: 3644.9,
				moving_time: 2244,
				elapsed_time: 2244,
				total_elevation_gain: 38.0,
				type: 'Walk',
				id: 12251270161,
				start_date: '2024-08-27T00:21:01Z',
				start_date_local: '2024-08-26T17:21:01Z',
				athlete_count: 2,
				gear_id: 'g11177469',
				average_speed: 1.624,
				max_speed: 2.779,
				average_heartrate: 101.6,
				max_heartrate: 115.0,
				elev_high: 139.4,
				elev_low: 124.6,
			},
			{
				name: 'Beach Run',
				distance: 5024.4,
				moving_time: 1593,
				elapsed_time: 1598,
				total_elevation_gain: 2.2,
				type: 'Run',
				id: 11961758419,
				start_date: '2024-07-23T16:13:50Z',
				start_date_local: '2024-07-23T09:13:50Z',
				athlete_count: 1,
				gear_id: 'g15117495',
				average_speed: 3.154,
				max_speed: 4.294,
				average_heartrate: 184.6,
				max_heartrate: 197.0,
				elev_high: 6.2,
				elev_low: 1.2,
			},
		];

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
