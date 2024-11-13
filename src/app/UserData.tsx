import { getStravaData } from '@/lib/getStravaData'
import DistanceGraph from './DistanceGraph'
import GearStats from './GearStats'

const UserData = async ({ accessToken }: { accessToken: string }) => {
	const { athlete, activities, stats }: AllApiData = await getStravaData(accessToken)

	return (
		<>
			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Gear</h2>
				<div className="flex flex-col gap-2">
					{athlete.shoes?.map((gear) => (
						<GearStats key={gear.id} icon="👟" gear={gear} allActivities={activities} />
					))}
					{athlete.bikes?.map((gear) => (
						<GearStats key={gear.id} icon="🚲" gear={gear} allActivities={activities} />
					))}
				</div>
			</section>

			<section className="w-full max-w-screen-sm">
				<h2 className="text-lg font-semibold">Weekly Distance</h2>
				<DistanceGraph activities={activities} />
			</section>
		</>
	)
}

export default UserData
