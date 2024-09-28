import { metersToMiles, rounded } from '@/lib/utils';

const GearStats = ({ icon, gear, allActivities }: { icon: string; gear: ApiGear; allActivities: ApiActivity[] }) => {
	const now = new Date().valueOf();
	const recentActivities = allActivities.filter((activity) => {
		const startTime = new Date(activity.start_date_local).valueOf();
		const within30Days = (now - startTime) / 1000 / 60 / 60 / 24 < 30;

		return activity.gear_id === gear.id && within30Days;
	});

	const recentDistance = recentActivities.reduce((total, activity) => total + activity.distance, 0);

	if (!recentActivities.length) return null;

	return (
		<div className="mb-2">
			{icon} {gear.name}
			<br />
			{gear.converted_distance} total miles
			<br />
			{rounded(metersToMiles(recentDistance))} recent miles ({recentActivities.length} activities)
		</div>
	);
};

export default GearStats;
