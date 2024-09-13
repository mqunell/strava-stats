import { averageRunHR, estimatedFastestDistance, parseWeeklyBuckets, maxActivityStat } from './ramblings';

describe('ramblings', () => {
	test('maxActivityStat', () => {
		const mocks = [
			{ average_speed: 10, distance: 1, moving_time: 5 },
			{ average_speed: 5, distance: 10, moving_time: 1 },
			{ average_speed: 1, distance: 5, moving_time: 10 },
		] as ApiActivity[];

		expect(maxActivityStat(mocks, 'average_speed')).toBe(mocks[0]);
		expect(maxActivityStat(mocks, 'distance')).toBe(mocks[1]);
		expect(maxActivityStat(mocks, 'moving_time')).toBe(mocks[2]);
	});

	test('estimatedFastestDistance', () => {
		const mocks = [
			{ average_speed: 10, distance: 400 },
			{ average_speed: 5, distance: 1610 },
			{ average_speed: 2, distance: 3220 },
			{ average_speed: 1, distance: 5000 },
			{ average_speed: 1.2, distance: 5000 },
			{ average_speed: 1.3, distance: 6000 },
			{ average_speed: 1.1, distance: 6000 },
		] as ApiActivity[];

		expect(estimatedFastestDistance(mocks, 200)).toBe(mocks[0]);
		expect(estimatedFastestDistance(mocks, 400)).toBe(mocks[0]);
		expect(estimatedFastestDistance(mocks, 1600)).toBe(mocks[1]);
		expect(estimatedFastestDistance(mocks, 3220)).toBe(mocks[2]);
		expect(estimatedFastestDistance(mocks, 5000)).toBe(mocks[5]);
		expect(estimatedFastestDistance(mocks, 6000)).toBe(mocks[5]);
	});

	test('averageRunHR', () => {
		const mocks = [
			{ average_heartrate: 140.7, average_speed: 1.72 },
			{ average_heartrate: 142.7, average_speed: 1.685 },
			{ average_heartrate: 141.4, average_speed: 1.717 },
			{ average_heartrate: 185.6, average_speed: 2.838 },
			{ average_heartrate: 179.9, average_speed: 3.106 },
			{ average_heartrate: 183.0, average_speed: 3.04 },
		] as ApiActivity[];

		expect(averageRunHR(mocks, 'slow')).toBe(141.6);
		expect(averageRunHR(mocks, 'fast')).toBe(182.8);

		expect(averageRunHR(mocks.slice(0, 3), 'fast')).toBeNull();
		expect(averageRunHR(mocks.slice(3), 'slow')).toBeNull();
	});

	test('parseWeeklyBuckets', () => {
		const mocks = [
			{ start_date_local: '2024-09-07T10:30:52Z' },
			{ start_date_local: '2024-09-06T19:17:41Z' },
			{ start_date_local: '2024-09-04T18:57:26Z' },
			{ start_date_local: '2024-09-03T14:49:49Z' },
			{ start_date_local: '2024-09-02T16:22:17Z' },
			{ start_date_local: '2024-09-01T11:37:48Z' },
			{ start_date_local: '2024-08-31T18:04:43Z' },
			{ start_date_local: '2024-08-29T15:09:14Z' },
			{ start_date_local: '2024-08-28T17:10:34Z' },
			{ start_date_local: '2024-08-27T15:30:15Z' },
			// gap in dates
			{ start_date_local: '2024-08-06T14:46:09Z' },
			{ start_date_local: '2024-08-05T18:04:17Z' },
			{ start_date_local: '2024-08-04T10:17:10Z' },
			{ start_date_local: '2024-08-02T18:15:46Z' },
			{ start_date_local: '2024-08-01T17:34:03Z' },
			{ start_date_local: '2024-07-30T16:54:51Z' },
			{ start_date_local: '2024-07-29T17:11:46Z' },
			{ start_date_local: '2024-07-28T15:21:18Z' },
			{ start_date_local: '2024-07-25T15:13:04Z' },
			{ start_date_local: '2024-07-23T09:13:50Z' },
		] as ApiActivity[];

		const expectedBuckets = {
			'2024-07-22': [
				{ start_date_local: '2024-07-23T09:13:50Z' },
				{ start_date_local: '2024-07-25T15:13:04Z' },
				{ start_date_local: '2024-07-28T15:21:18Z' },
			],
			'2024-07-29': [
				{ start_date_local: '2024-07-29T17:11:46Z' },
				{ start_date_local: '2024-07-30T16:54:51Z' },
				{ start_date_local: '2024-08-01T17:34:03Z' },
				{ start_date_local: '2024-08-02T18:15:46Z' },
				{ start_date_local: '2024-08-04T10:17:10Z' },
			],
			'2024-08-05': [
				// formatting
				{ start_date_local: '2024-08-05T18:04:17Z' },
				{ start_date_local: '2024-08-06T14:46:09Z' },
			],
			'2024-08-12': [],
			'2024-08-19': [],
			'2024-08-26': [
				{ start_date_local: '2024-08-27T15:30:15Z' },
				{ start_date_local: '2024-08-28T17:10:34Z' },
				{ start_date_local: '2024-08-29T15:09:14Z' },
				{ start_date_local: '2024-08-31T18:04:43Z' },
				{ start_date_local: '2024-09-01T11:37:48Z' },
			],
			'2024-09-02': [
				{ start_date_local: '2024-09-02T16:22:17Z' },
				{ start_date_local: '2024-09-03T14:49:49Z' },
				{ start_date_local: '2024-09-04T18:57:26Z' },
				{ start_date_local: '2024-09-06T19:17:41Z' },
				{ start_date_local: '2024-09-07T10:30:52Z' },
			],
		};

		expect(parseWeeklyBuckets(mocks)).toStrictEqual(expectedBuckets);
	});
});
