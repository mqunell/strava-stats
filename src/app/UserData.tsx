import dynamic from 'next/dynamic';
import { getStravaData } from '@/lib/getStravaData';
import GearStats from './GearStats';

const DistanceGraph = dynamic(() => import('./DistanceGraph'), { ssr: false });

const UserData = async ({ accessToken }: { accessToken: string }) => {
	const { athlete, activities, stats }: AllApiData = await getStravaData(accessToken);

	return (
		<section>
			<p>{accessToken}</p>
			<hr />
			<h2 className="text-lg font-semibold">Gear</h2>
			{athlete.shoes?.map((gear) => <GearStats key={gear.id} icon="👟" gear={gear} allActivities={activities} />)}
			{athlete.bikes?.map((gear) => <GearStats key={gear.id} icon="🚲" gear={gear} allActivities={activities} />)}

			<h2 className="text-lg font-semibold">Weekly Distance</h2>
			<DistanceGraph activities={activities} />
		</section>
	);
};

export default UserData;
