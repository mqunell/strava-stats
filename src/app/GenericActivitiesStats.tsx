import { metersToMiles, mpsToMph, rounded } from '@/lib/utils'

const GridRow = ({
	title,
	value,
	activity,
}: {
	title: string
	value: string
	activity: ApiActivity
}) => (
	<div>
		<p className="leading-none">
			{title}: {value}
		</p>
		<a
			target="_blank"
			href={`https://www.strava.com/activities/${activity.id}`}
			className="w-min text-xs italic text-blue-500 underline hover:text-blue-400"
		>
			{activity.name}, {activity.start_date_local.slice(0, 10)} ↗️
		</a>
	</div>
)

// Takes a pre-filtered subset of ApiActivity[]
const GenericActivitiesStats = ({ activities }: { activities: ApiActivity[] }) => {
	let maxDistance: ApiActivity = activities[0]
	let maxAvgSpeed: ApiActivity = activities[0]
	let maxMaxSpeed: ApiActivity = activities[0]

	activities.forEach((activity) => {
		if (activity.distance > maxDistance.distance) maxDistance = activity
		if (activity.average_speed > maxAvgSpeed.average_speed) maxAvgSpeed = activity
		if (activity.max_speed > maxMaxSpeed.max_speed) maxMaxSpeed = activity
	})

	if (!activities.length) {
		return <>No activities to analyze</>
	}

	return (
		<div className="flex flex-col gap-2 rounded border px-5 py-4">
			<GridRow
				title="Longest distance"
				value={`${rounded(metersToMiles(maxDistance.distance))} miles`}
				activity={maxDistance}
			/>
			<GridRow
				title="Highest average speed"
				value={`${rounded(mpsToMph(maxAvgSpeed.average_speed))} mph`}
				activity={maxAvgSpeed}
			/>
			<GridRow
				title="Highest max speed"
				value={`${rounded(mpsToMph(maxMaxSpeed.max_speed))} mph`}
				activity={maxMaxSpeed}
			/>
		</div>
	)
}

export default GenericActivitiesStats
