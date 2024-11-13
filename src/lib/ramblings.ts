// Assumes activities are filtered by type
export const maxActivityStat = (
	activities: ApiActivity[],
	stat: 'distance' | 'moving_time' | 'average_speed',
): ApiActivity | null => {
	if (!activities.length) {
		return null
	}

	let max = activities[0]
	for (const activity of activities) {
		if (activity[stat] > max[stat]) {
			max = activity
		}
	}

	return max
}

export const estimatedFastestDistance = (
	activities: ApiActivity[],
	distance: number,
): ApiActivity | null => {
	if (!activities.length) {
		return null
	}

	const eligibleActivities = activities.filter((activity) => activity.distance >= distance)
	return maxActivityStat(eligibleActivities, 'average_speed')
}

// Assumes activities are filtered to runs
// 10 minute mile threshold = 6 miles per hour = 2.68 meters per second
export const averageRunHR = (activities: ApiActivity[], speed: 'slow' | 'fast'): number | null => {
	let eligibleCount = 0
	let cumulativeHR = 0

	for (const activity of activities) {
		const isEligible =
			speed === 'slow' ? activity.average_speed <= 2.68 : activity.average_speed > 2.68

		if (isEligible) {
			eligibleCount++
			cumulativeHR += activity.average_heartrate
		}
	}

	return Number((cumulativeHR / eligibleCount).toFixed(1)) || null
}
