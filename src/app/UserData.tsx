import { getStravaData } from '@/lib/getStravaData'
import DistanceGraph from './DistanceGraph'
import GearStats from './GearStats'
import GenericActivitiesStats from './GenericActivitiesStats'

// TODO: Move some of these filters and components to
// specific tabs when a toggle group or something exists

const UserData = async ({ accessToken }: { accessToken: string }) => {
	const { athlete, activities, stats }: AllApiData = await getStravaData(accessToken)

	const walkActivities = activities.filter(({ type }) => type === 'Walk')
	const runActivities = activities.filter(({ type }) => type === 'Run')
	const rideActivities = activities.filter(({ type }) => type === 'Ride')

	return (
		<>
			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Gear</h2>
				<GearStats athlete={athlete} activities={activities} />
			</section>

			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Weekly Distance</h2>
				<DistanceGraph activities={activities} />
			</section>

			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Walk Stats</h2>
				<GenericActivitiesStats activities={walkActivities} />
			</section>

			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Run Stats</h2>
				<GenericActivitiesStats activities={runActivities} />
			</section>

			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Bike Stats</h2>
				<GenericActivitiesStats activities={rideActivities} />
			</section>
		</>
	)
}

export default UserData
