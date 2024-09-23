type WeeklyBuckets = {
	[key: string]: ApiActivity[];
};

type GraphBucket = {
	week: string;
	ride: number;
	run: number;
	walk: number;
};
