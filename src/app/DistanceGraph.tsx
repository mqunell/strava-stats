'use client';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { formatGraphBuckets, parseWeeklyBuckets } from '@/lib/bucketing';

const DistanceGraph = ({ activities }: { activities: ApiActivity[] }) => {
	const weeklyBuckets = parseWeeklyBuckets(activities);
	const graphBuckets = formatGraphBuckets(weeklyBuckets);

	return (
		<BarChart width={500} height={300} data={graphBuckets}>
			<CartesianGrid strokeDasharray="4" />
			<XAxis dataKey="week" />
			<YAxis />
			<Tooltip />
			<Bar dataKey="walk" fill="#bccad6" />
			<Bar dataKey="run" fill="#8d9db6" />
			<Bar dataKey="ride" fill="#667292" />
		</BarChart>
	);
};

export default DistanceGraph;
