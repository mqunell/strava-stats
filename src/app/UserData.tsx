import dynamic from 'next/dynamic';

const DistanceGraph = dynamic(() => import('./DistanceGraph'), { ssr: false });

type AllApiData = {
	athlete: ApiAthlete;
	activities: ApiActivity[];
	stats: ApiStats;
};

// TODO: Move this to a utils files
const metersToMiles = (meters: number): number => {
	const miles = meters / 1609.344;
	return Number(miles.toFixed(2));
};

const GetData = async (accessToken: string): Promise<AllApiData> => {
	const baseUrl = 'https://www.strava.com/api/v3';
	const fetchOptions = {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` },
	};

	const athleteRes = await fetch(`${baseUrl}/athlete`, fetchOptions);
	const athlete: ApiAthlete = await athleteRes.json();

	const activitesRes = await fetch(`${baseUrl}/athlete/activities`, fetchOptions);
	const activities: ApiActivity[] = await activitesRes.json();

	const statsRes = await fetch(`${baseUrl}/athletes/${athlete.id}/stats`, fetchOptions);
	const stats: ApiStats = await statsRes.json();

	return { athlete, activities, stats };
};

const GearStats = ({ icon, gear, allActivities }: { icon: string; gear: ApiGear; allActivities: ApiActivity[] }) => {
	const now = new Date().valueOf();
	const recentActivities = allActivities.filter((activity) => {
		const startTime = new Date(activity.start_date_local).valueOf();
		const within30Days = (now - startTime) / 1000 / 60 / 60 / 24 < 30;

		return activity.gear_id === gear.id && within30Days;
	});

	const recentDistance = recentActivities.reduce((total, activity) => total + activity.distance, 0);

	if (!recentActivities.length) return null;

	return (
		<div className="mb-2">
			{icon} {gear.name}
			<br />
			{gear.converted_distance} total miles
			<br />
			{metersToMiles(recentDistance)} recent miles ({recentActivities.length} activities)
		</div>
	);
};

const UserData = async ({ accessToken }: { accessToken: string }) => {
	const { athlete, activities, stats }: AllApiData = await GetData(accessToken);

	return (
		<section>
			<p>{accessToken}</p>
			<hr />
			<span className="text-lg font-semibold">Gear</span>
			{athlete.shoes?.map((gear) => <GearStats key={gear.id} icon="👟" gear={gear} allActivities={activities} />)}
			{athlete.bikes?.map((gear) => <GearStats key={gear.id} icon="🚲" gear={gear} allActivities={activities} />)}

			<span className="text-lg font-semibold">Weekly Distance</span>
			<DistanceGraph activities={activities} />
		</section>
	);
};

export default UserData;
