const GetData = async (accessToken: string): Promise<ApiAthlete> => {
	const fetchOptions = {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` },
	};

	const athleteRes = await fetch('https://www.strava.com/api/v3/athlete', fetchOptions);
	const athleteData: ApiAthlete = await athleteRes.json();

	const statsRes = await fetch(
		`https://www.strava.com/api/v3/athletes/${athleteData.id}/stats`,
		fetchOptions,
	);
	const statsData: ApiStats = await statsRes.json();

	// TODO: Clean this up, get all activities, then format and return everything

	return athleteData;
};

const UserData = async ({ accessToken }: { accessToken: string }) => {
	const data: ApiAthlete = await GetData(accessToken);

	return <p>{accessToken}</p>;
};

export default UserData;
