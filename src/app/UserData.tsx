type AllApiData = {
	athlete: ApiAthlete;
	activities: ApiActivity[];
	stats: ApiStats;
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

const UserData = async ({ accessToken }: { accessToken: string }) => {
	const { athlete, activities, stats }: AllApiData = await GetData(accessToken);

	return <p>{accessToken}</p>;
};

export default UserData;
