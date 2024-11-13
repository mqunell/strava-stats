import { metersToMiles, rounded } from '@/lib/utils'

export const activityTypeDistances = (activities: ApiActivity[]): { [key: string]: number } => {
	const results: { [key: string]: number } = {}

	activities.forEach(({ distance, type }) => {
		const currentDistance = results[type] ?? 0
		results[type] = currentDistance + distance
	})

	return results
}

const GearStats = ({
	icon,
	gear,
	allActivities,
}: {
	icon: string
	gear: ApiGear
	allActivities: ApiActivity[]
}) => {
	const gearActivities: ApiActivity[] = allActivities.filter(({ gear_id }) => gear_id === gear.id)
	const typeDistances: [string, number][] = Object.entries(activityTypeDistances(gearActivities))
	typeDistances.sort((a, b) => (a[1] > b[1] ? -1 : 1))

	const now = new Date().valueOf()
	const recentActivities: ApiActivity[] = gearActivities.filter((activity) => {
		const startTime = new Date(activity.start_date_local).valueOf()
		const within30Days = (now - startTime) / 1000 / 60 / 60 / 24 < 30

		return within30Days
	})
	const recentDistance: number = recentActivities.reduce(
		(total, activity) => total + activity.distance,
		0,
	)

	return (
		<div className="mb-2 flex flex-col rounded border px-5 py-4">
			<p>
				{icon} <span className="font-semibold">{gear.name}</span>
			</p>
			<ul className="list-disc pl-8">
				<li>Total: {rounded(gear.converted_distance)} miles</li>
				{recentDistance > 0 && <li>Recent: {rounded(metersToMiles(recentDistance))} </li>}
				{typeDistances.length > 1 && (
					<>
						{typeDistances.map(([type, distance]) => (
							<li key={`${gear.id}-${type}`}>
								{type}: {rounded(metersToMiles(distance))}
							</li>
						))}
					</>
				)}
			</ul>
		</div>
	)
}

export default GearStats
