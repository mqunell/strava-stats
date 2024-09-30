import { pick } from './utils';

const baseUrl = 'https://www.strava.com/api/v3';

const getAthlete = async (fetchOptions: object): Promise<ApiAthlete> => {
	const res = await fetch(`${baseUrl}/athlete`, fetchOptions);
	const data: ApiAthlete = await res.json();

	const athlete: ApiAthlete = pick(data, ['id', 'firstname', 'lastname', 'created_at', 'updated_at', 'bikes', 'shoes']);
	const gearKeys: (keyof ApiGear)[] = ['id', 'name', 'distance', 'converted_distance'];
	athlete.bikes = athlete.bikes.map((gear) => pick(gear, gearKeys));
	athlete.shoes = athlete.shoes.map((gear) => pick(gear, gearKeys));

	return athlete;
};

const getActivities = async (fetchOptions: object): Promise<ApiActivity[]> => {
	const res = await fetch(`${baseUrl}/athlete/activities?per_page=200&page=1`, fetchOptions);
	const data: ApiActivity[] = await res.json();

	const activities: ApiActivity[] = data.map((activity) =>
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

	return activities;
};

const getStats = async (fetchOptions: object, athleteId: number | string): Promise<ApiStats> => {
	const res = await fetch(`${baseUrl}/athletes/${athleteId}/stats`, fetchOptions);
	const data: ApiStats = await res.json();

	const stats = pick(data, [
		'recent_ride_totals',
		'ytd_ride_totals',
		'all_ride_totals',
		'recent_run_totals',
		'all_run_totals',
		'ytd_run_totals',
	]);

	return stats;
};

export const getStravaData = async (accessToken: string): Promise<AllApiData> => {
	const fetchOptions = {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` },
	};

	const athlete: ApiAthlete = await getAthlete(fetchOptions);
	const activities: ApiActivity[] = await getActivities(fetchOptions);
	const stats: ApiStats = await getStats(fetchOptions, athlete.id);

	return { athlete, activities, stats };
};
