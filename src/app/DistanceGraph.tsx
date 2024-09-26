'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { formatGraphBuckets, parseWeeklyBuckets } from '@/lib/bucketing';

const DistanceGraph = ({ activities }: { activities: ApiActivity[] }) => {
	const [showMiles, setShowMiles] = useState(true);

	const weeklyBuckets: WeeklyBuckets = parseWeeklyBuckets(activities);
	const graphBuckets: GraphBucket[] = formatGraphBuckets(weeklyBuckets);

	return (
		<div>
			<label className="flex gap-1">
				<input type="checkbox" checked={showMiles} onChange={(e) => setShowMiles(e.target.checked)} />
				Miles
			</label>

			<BarChart width={500} height={300} data={graphBuckets}>
				<CartesianGrid strokeDasharray="4" />
				<XAxis dataKey="week" />
				<YAxis />
				<Tooltip />
				<Bar dataKey={showMiles ? 'walkMiles' : 'walkMeters'} name="Walk" fill="#bccad6" />
				<Bar dataKey={showMiles ? 'runMiles' : 'runMeters'} name="Run" fill="#8d9db6" />
				<Bar dataKey={showMiles ? 'rideMiles' : 'rideMeters'} name="Bike" fill="#667292" />
			</BarChart>
		</div>
	);
};

export default DistanceGraph;
