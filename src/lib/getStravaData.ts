import { pick } from './utils';

export const getStravaData = async (accessToken: string): Promise<AllApiData> => {
	const baseUrl = 'https://www.strava.com/api/v3';
	const fetchOptions = {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` },
	};

	const athleteRes = await fetch(`${baseUrl}/athlete`, fetchOptions);
	const fullAthlete: ApiAthlete = await athleteRes.json();
	const trimmedAthlete: ApiAthlete = pick(fullAthlete, [
		'id',
		'firstname',
		'lastname',
		'created_at',
		'updated_at',
		'bikes',
		'shoes',
	]);
	const gearKeys: (keyof ApiGear)[] = ['id', 'name', 'distance', 'converted_distance'];
	trimmedAthlete.bikes = trimmedAthlete.bikes.map((gear) => pick(gear, gearKeys));
	trimmedAthlete.shoes = trimmedAthlete.shoes.map((gear) => pick(gear, gearKeys));

	const activitesRes = await fetch(`${baseUrl}/athlete/activities`, fetchOptions);
	const fullActivities: ApiActivity[] = await activitesRes.json();
	const trimmedActivities: ApiActivity[] = fullActivities.map((activity) =>
		pick(activity, [
			'id',
			'name',
			'distance',
			'start_date',
			'start_date_local',
			'moving_time',
			'elapsed_time',
			'total_elevation_gain',
			'type',
			'athlete_count',
			'gear_id',
			'average_speed',
			'max_speed',
			'elev_low',
			'elev_high',
			'average_heartrate',
			'max_heartrate',
		]),
	);

	const statsRes = await fetch(`${baseUrl}/athletes/${trimmedAthlete.id}/stats`, fetchOptions);
	const fullStats: ApiStats = await statsRes.json();
	const trimmedStats = pick(fullStats, [
		'recent_ride_totals',
		'ytd_ride_totals',
		'all_ride_totals',
		'recent_run_totals',
		'all_run_totals',
		'ytd_run_totals',
	]);

	return { athlete: trimmedAthlete, activities: trimmedActivities, stats: trimmedStats };
};
