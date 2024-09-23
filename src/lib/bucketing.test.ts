import { parseWeeklyBuckets, formatGraphBuckets } from './bucketing';

describe('bucketing', () => {
	const mocks: ApiActivity[] = [
		{ start_date_local: '2024-07-23T09:13:50Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-07-25T15:13:04Z', type: 'Walk', distance: 2 } as ApiActivity,
		{ start_date_local: '2024-07-28T15:21:18Z', type: 'Walk', distance: 3 } as ApiActivity,
		{ start_date_local: '2024-07-29T17:11:46Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-07-30T16:54:51Z', type: 'Run', distance: 2 } as ApiActivity,
		{ start_date_local: '2024-08-01T17:34:03Z', type: 'Ride', distance: 3 } as ApiActivity,
		{ start_date_local: '2024-08-02T18:15:46Z', type: 'Walk', distance: 4 } as ApiActivity,
		{ start_date_local: '2024-08-04T10:17:10Z', type: 'Run', distance: 5 } as ApiActivity,
		{ start_date_local: '2024-08-05T18:04:17Z', type: 'Ride', distance: 6 } as ApiActivity,
		{ start_date_local: '2024-08-06T14:46:09Z', type: 'Run', distance: 6 } as ApiActivity,
		// gap in dates
		{ start_date_local: '2024-08-27T15:30:15Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-08-28T17:10:34Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-08-29T15:09:14Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-08-31T18:04:43Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-09-01T11:37:48Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-09-02T16:22:17Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-09-03T14:49:49Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-09-04T18:57:26Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-09-06T19:17:41Z', type: 'Walk', distance: 1 } as ApiActivity,
		{ start_date_local: '2024-09-07T10:30:52Z', type: 'Walk', distance: 1 } as ApiActivity,
	];

	const mockBuckets: WeeklyBuckets = {
		'2024-07-22': [mocks[0], mocks[1], mocks[2]],
		'2024-07-29': [mocks[3], mocks[4], mocks[5], mocks[6], mocks[7]],
		'2024-08-05': [mocks[8], mocks[9]],
		'2024-08-12': [],
		'2024-08-19': [],
		'2024-08-26': [mocks[10], mocks[11], mocks[12], mocks[13], mocks[14]],
		'2024-09-02': [mocks[15], mocks[16], mocks[17], mocks[18], mocks[19]],
	};

	test('parseWeeklyBuckets', () => {
		const reverseChronoMocks = [...mocks].reverse();
		expect(parseWeeklyBuckets(reverseChronoMocks)).toStrictEqual(mockBuckets);
	});

	test('formatGraphBuckets', () => {
		expect(formatGraphBuckets(mockBuckets)).toStrictEqual([
			{ week: '2024-07-22', ride: 0, run: 0, walk: 6 },
			{ week: '2024-07-29', ride: 3, run: 7, walk: 5 },
			{ week: '2024-08-05', ride: 6, run: 6, walk: 0 },
			{ week: '2024-08-12', ride: 0, run: 0, walk: 0 },
			{ week: '2024-08-19', ride: 0, run: 0, walk: 0 },
			{ week: '2024-08-26', ride: 0, run: 0, walk: 5 },
			{ week: '2024-09-02', ride: 0, run: 0, walk: 5 },
		]);
	});
});
