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
			<span className="text-lg font-semibold">Gear</span>
			{athlete.shoes?.map((gear) => <GearStats key={gear.id} icon="👟" gear={gear} allActivities={activities} />)}
			{athlete.bikes?.map((gear) => <GearStats key={gear.id} icon="🚲" gear={gear} allActivities={activities} />)}

			<span className="text-lg font-semibold">Weekly Distance</span>
			<DistanceGraph activities={activities} />
		</section>
	);
};

export default UserData;
