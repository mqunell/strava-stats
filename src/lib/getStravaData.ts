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
	]) as ApiAthlete; // TODO: Not type safe - these keys are not being checked

	const activitesRes = await fetch(`${baseUrl}/athlete/activities`, fetchOptions);
	const fullActivities: ApiActivity[] = await activitesRes.json();
	const trimmedActivities: ApiActivity[] = fullActivities.map((a) => ({
		id: a.id,
		name: a.name,
		distance: a.distance,
		start_date: a.start_date,
		start_date_local: a.start_date_local,
		moving_time: a.moving_time,
		elapsed_time: a.elapsed_time,
		total_elevation_gain: a.total_elevation_gain,
		type: a.type,
		athlete_count: a.athlete_count,
		gear_id: a.gear_id,
		average_speed: a.average_speed,
		max_speed: a.max_speed,
		elev_low: a.elev_low,
		elev_high: a.elev_high,
		average_heartrate: a.average_heartrate,
		max_heartrate: a.max_heartrate,
	}));

	const statsRes = await fetch(`${baseUrl}/athletes/${trimmedAthlete.id}/stats`, fetchOptions);
	const fullStats: ApiStats = await statsRes.json();
	const trimmedStats = {
		recent_ride_totals: fullStats.recent_ride_totals,
		ytd_ride_totals: fullStats.ytd_ride_totals,
		all_ride_totals: fullStats.all_ride_totals,
		recent_run_totals: fullStats.recent_run_totals,
		all_run_totals: fullStats.all_run_totals,
		ytd_run_totals: fullStats.ytd_run_totals,
	};

	return { athlete: trimmedAthlete, activities: trimmedActivities, stats: trimmedStats };
};
