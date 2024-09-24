type AllApiData = {
	athlete: ApiAthlete;
	activities: ApiActivity[];
	stats: ApiStats;
};

type WeeklyBuckets = {
	[key: string]: ApiActivity[];
};

type GraphBucket = {
	week: string;
	ride: number;
	run: number;
	walk: number;
};
