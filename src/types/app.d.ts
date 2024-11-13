type AllApiData = {
	athlete: ApiAthlete
	activities: ApiActivity[]
	stats: ApiStats
}

type WeeklyBuckets = {
	[key: string]: ApiActivity[]
}

type GraphBucket = {
	week: string
	rideMeters: number
	rideMiles: number
	runMeters: number
	runMiles: number
	walkMeters: number
	walkMiles: number
}
