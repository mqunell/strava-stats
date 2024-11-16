import { render, screen } from '@testing-library/react'
import GenericActivitiesStats from './GenericActivitiesStats'

describe('GenericActivitiesStats', () => {
	it('renders with an empty array', async () => {
		render(<GenericActivitiesStats activities={[]} />)
		screen.getByText(/no activities to analyze/i)
	})

	it('displays the correct stats for various activities', async () => {
		const mocks = [
			{
				id: 1,
				name: 'A',
				start_date_local: '2024-11-15',
				average_speed: 1,
				max_speed: 2,
				distance: 3000, // 1.86 miles
			} as ApiActivity,
			{
				id: 2,
				name: 'B',
				start_date_local: '2024-11-16',
				average_speed: 2,
				max_speed: 5, // 11.18 mph
				distance: 1000,
			} as ApiActivity,
			{
				id: 3,
				name: 'C',
				start_date_local: '2024-11-17',
				average_speed: 4, // 8.95 mph
				max_speed: 4,
				distance: 2000,
			} as ApiActivity,
		]
		render(<GenericActivitiesStats activities={mocks} />)

		screen.getByText('Longest distance: 1.86 miles')
		screen.getByText('Highest average speed: 8.95 mph')
		screen.getByText('Highest max speed: 11.18 mph')
	})
})
