import { metersToMiles, rounded } from './utils';

const previousMonday = (dateString: string): Date => {
	const date = new Date(dateString);
	date.setHours(0, 0, 0);

	while (date.getDay() !== 1) {
		date.setDate(date.getDate() - 1);
	}

	return date;
};

const keyify = (date: Date): string => date.toISOString().split('T')[0];

export const parseWeeklyBuckets = (activities: ApiActivity[]): WeeklyBuckets => {
	if (!activities.length) {
		return {};
	}

	// Initialize the buckets map
	const buckets: WeeklyBuckets = {};

	// Put the activities in chronological order
	activities.sort((a, b) => (a.start_date_local < b.start_date_local ? -1 : 1));

	// Find the Mondays for the first and last buckets
	let firstBucketStart: Date = previousMonday(activities[0].start_date_local);
	const lastBucketStart: Date = previousMonday(activities[activities.length - 1].start_date_local);

	// Create all the buckets
	while (firstBucketStart <= lastBucketStart) {
		buckets[keyify(firstBucketStart)] = [];
		firstBucketStart.setDate(firstBucketStart.getDate() + 7);
	}

	// Loop through activities and add to buckets
	for (const activity of activities) {
		const targetBucket: Date = previousMonday(activity.start_date_local);
		buckets[keyify(targetBucket)].push(activity);
	}

	return buckets;
};

export const formatGraphBuckets = (buckets: WeeklyBuckets): GraphBucket[] => {
	const output: GraphBucket[] = [];

	for (const key of Object.keys(buckets)) {
		let rideMeters = 0;
		let runMeters = 0;
		let walkMeters = 0;

		for (const activity of buckets[key]) {
			if (activity.type === 'Ride') rideMeters += activity.distance;
			if (activity.type === 'Run') runMeters += activity.distance;
			if (activity.type === 'Walk') walkMeters += activity.distance;
		}

		output.push({
			week: key.slice(5),
			rideMeters: rounded(rideMeters),
			rideMiles: rounded(metersToMiles(rideMeters)),
			runMeters: rounded(runMeters),
			runMiles: rounded(metersToMiles(runMeters)),
			walkMeters: rounded(walkMeters),
			walkMiles: rounded(metersToMiles(walkMeters)),
		});
	}

	return output;
};
