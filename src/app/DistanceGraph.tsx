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
	<label className="flex gap-1">
		<input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
		{label}
	</label>
)

const DistanceGraph = ({ activities }: { activities: ApiActivity[] }) => {
	// https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => setHydrated(true))

	const [showMiles, setShowMiles] = useState(true)
	const [showWalk, setShowWalk] = useState(true)
	const [showRun, setShowRun] = useState(true)
	const [showRide, setShowRide] = useState(true)
	const [page, setPage] = useState(0)

	const weeklyBuckets: WeeklyBuckets = parseWeeklyBuckets(activities)
	const graphBuckets: GraphBucket[] = formatGraphBuckets(weeklyBuckets)
	const paginated: GraphBucket[] = paginateReverse({ data: graphBuckets, page, limit: 4 })

	const canPaginateLeft = paginated[0].week !== graphBuckets[0].week
	const canPaginateRight = page > 0

	if (!hydrated) return null

	return (
		<div className="rounded border px-5 py-4">
			<div className="flex gap-4">
				<Toggle label="Miles" checked={showMiles} setChecked={(v: boolean) => setShowMiles(v)} />
				<Toggle label="Walk" checked={showWalk} setChecked={(v: boolean) => setShowWalk(v)} />
				<Toggle label="Run" checked={showRun} setChecked={(v: boolean) => setShowRun(v)} />
				<Toggle label="Bike" checked={showRide} setChecked={(v: boolean) => setShowRide(v)} />
			</div>

			<ResponsiveContainer height={300}>
				<BarChart data={paginated} margin={{ left: 0 }}>
					<CartesianGrid strokeDasharray="4" />
					<XAxis dataKey="week" />
					<YAxis />
					<Tooltip />
					{showWalk && (
						<Bar dataKey={showMiles ? 'walkMiles' : 'walkMeters'} name="Walk" fill="#bccad6" />
					)}
					{showRun && (
						<Bar dataKey={showMiles ? 'runMiles' : 'runMeters'} name="Run" fill="#8d9db6" />
					)}
					{showRide && (
						<Bar dataKey={showMiles ? 'rideMiles' : 'rideMeters'} name="Bike" fill="#667292" />
					)}
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
