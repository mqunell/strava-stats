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
	rideKilometers: number
	rideMiles: number
	runKilometers: number
	runMiles: number
	walkKilometers: number
	walkMiles: number
}
