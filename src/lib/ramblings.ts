// Assumes activities are filtered by type
export const maxActivityStat = (
	activities: ApiActivity[],
	stat: 'distance' | 'moving_time' | 'average_speed',
): ApiActivity | null => {
	if (!activities.length) {
		return null;
	}

	let max = activities[0];
	for (const activity of activities) {
		if (activity[stat] > max[stat]) {
			max = activity;
		}
	}

	return max;
};

export const estimatedFastestDistance = (activities: ApiActivity[], distance: number): ApiActivity | null => {
	if (!activities.length) {
		return null;
	}

	const eligibleActivities = activities.filter((activity) => activity.distance >= distance);
	return maxActivityStat(eligibleActivities, 'average_speed');
};

// Assumes activities are filtered to runs
// 10 minute mile threshold = 6 miles per hour = 2.68 meters per second
export const averageRunHR = (activities: ApiActivity[], speed: 'slow' | 'fast'): number | null => {
	let eligibleCount = 0;
	let cumulativeHR = 0;

	for (const activity of activities) {
		const isEligible = speed === 'slow' ? activity.average_speed <= 2.68 : activity.average_speed > 2.68;

		if (isEligible) {
			eligibleCount++;
			cumulativeHR += activity.average_heartrate;
		}
	}

	return Number((cumulativeHR / eligibleCount).toFixed(1)) || null;
};

const previousMonday = (dateString: string): Date => {
	const date = new Date(dateString);
	date.setHours(0, 0, 0);

	while (date.getDay() !== 1) {
		date.setDate(date.getDate() - 1);
	}

	return date;
};

const keyify = (date: Date): string => date.toISOString().split('T')[0];

export const parseWeeklyBuckets = (activities: ApiActivity[]): { [key: string]: ApiActivity[] } => {
	if (!activities.length) {
		return {};
	}

	// Initialize the buckets map
	const buckets: { [key: string]: ApiActivity[] } = {};

	// Put the activities in chronological order
	activities.reverse();

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
