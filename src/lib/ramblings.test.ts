import { averageRunHR, estimatedFastestDistance, maxActivityStat } from './ramblings'

describe('ramblings', () => {
	test('maxActivityStat', () => {
		const mocks = [
			{ average_speed: 10, distance: 1, moving_time: 5 },
			{ average_speed: 5, distance: 10, moving_time: 1 },
			{ average_speed: 1, distance: 5, moving_time: 10 },
		] as ApiActivity[]

		expect(maxActivityStat(mocks, 'average_speed')).toBe(mocks[0])
		expect(maxActivityStat(mocks, 'distance')).toBe(mocks[1])
		expect(maxActivityStat(mocks, 'moving_time')).toBe(mocks[2])
	})

	test('estimatedFastestDistance', () => {
		const mocks = [
			{ average_speed: 10, distance: 400 },
			{ average_speed: 5, distance: 1610 },
			{ average_speed: 2, distance: 3220 },
			{ average_speed: 1, distance: 5000 },
			{ average_speed: 1.2, distance: 5000 },
			{ average_speed: 1.3, distance: 6000 },
			{ average_speed: 1.1, distance: 6000 },
		] as ApiActivity[]

		expect(estimatedFastestDistance(mocks, 200)).toBe(mocks[0])
		expect(estimatedFastestDistance(mocks, 400)).toBe(mocks[0])
		expect(estimatedFastestDistance(mocks, 1600)).toBe(mocks[1])
		expect(estimatedFastestDistance(mocks, 3220)).toBe(mocks[2])
		expect(estimatedFastestDistance(mocks, 5000)).toBe(mocks[5])
		expect(estimatedFastestDistance(mocks, 6000)).toBe(mocks[5])
	})

	test('averageRunHR', () => {
		const mocks = [
			{ average_heartrate: 140.7, average_speed: 1.72 },
			{ average_heartrate: 142.7, average_speed: 1.685 },
			{ average_heartrate: 141.4, average_speed: 1.717 },
			{ average_heartrate: 185.6, average_speed: 2.838 },
			{ average_heartrate: 179.9, average_speed: 3.106 },
			{ average_heartrate: 183.0, average_speed: 3.04 },
		] as ApiActivity[]

		expect(averageRunHR(mocks, 'slow')).toBe(141.6)
		expect(averageRunHR(mocks, 'fast')).toBe(182.8)

		expect(averageRunHR(mocks.slice(0, 3), 'fast')).toBeNull()
		expect(averageRunHR(mocks.slice(3), 'slow')).toBeNull()
	})
})
