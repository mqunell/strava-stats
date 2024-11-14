'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatGraphBuckets, parseWeeklyBuckets } from '@/lib/bucketing'
import { paginateReverse } from '@/lib/utils'

const Toggle = ({
	label,
	checked,
	setChecked,
}: {
	label: string
	checked: boolean
	setChecked: Function
}) => (
	<label className="flex items-center gap-1">
		<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
		{label}
	</label>
)

const DistanceGraph = ({ activities }: { activities: ApiActivity[] }) => {
	// https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => setHydrated(true), [])

	const [showWalk, setShowWalk] = useState(true)
	const [showRun, setShowRun] = useState(true)
	const [showRide, setShowRide] = useState(true)
	const [useMiles, setUseMiles] = useState(true)
	const [page, setPage] = useState(0)

	const weeklyBuckets: WeeklyBuckets = parseWeeklyBuckets(activities)
	const graphBuckets: GraphBucket[] = formatGraphBuckets(weeklyBuckets)
	const paginated: GraphBucket[] = paginateReverse({ data: graphBuckets, page, limit: 4 })

	const canPaginateLeft = paginated[0].week !== graphBuckets[0].week
	const canPaginateRight = page > 0
	const dataLabel = useMiles ? 'Miles' : 'Kilometers'

	if (!hydrated) return null

	return (
		<div className="flex flex-col gap-4 rounded border px-5 py-4">
			<div className="flex gap-x-4">
				<Toggle label="Walk" checked={showWalk} setChecked={(v: boolean) => setShowWalk(v)} />
				<Toggle label="Run" checked={showRun} setChecked={(v: boolean) => setShowRun(v)} />
				<Toggle label="Bike" checked={showRide} setChecked={(v: boolean) => setShowRide(v)} />
			</div>

			<ResponsiveContainer height={300}>
				<BarChart data={paginated} margin={{ left: 0, right: 15 }}>
					<CartesianGrid strokeDasharray="4" />
					<XAxis dataKey="week" />
					<YAxis
						width={45}
						label={{
							value: dataLabel,
							angle: -90,
							position: 'insideLeft',
							onClick: () => setUseMiles((prev) => !prev),
						}}
						onClick={() => setUseMiles((prev) => !prev)}
					/>
					<Tooltip />
					{showWalk && <Bar dataKey={`walk${dataLabel}`} name="Walk" fill="#bccad6" />}
					{showRun && <Bar dataKey={`run${dataLabel}`} name="Run" fill="#8d9db6" />}
					{showRide && <Bar dataKey={`ride${dataLabel}`} name="Bike" fill="#667292" />}
				</BarChart>
			</ResponsiveContainer>

			<div className="flex">
				{canPaginateLeft && <button onClick={() => setPage((prev) => prev + 1)}>◀️</button>}
				{canPaginateRight && (
					<div className="ml-auto flex gap-2">
						<button onClick={() => setPage((prev) => prev - 1)}>▶️</button>
						<button onClick={() => setPage(0)}>⏩</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default DistanceGraph
