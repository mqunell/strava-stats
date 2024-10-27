import { activityTypeDistances } from './GearStats';

describe('GearStats', () => {
	test('activityTypeDistances', () => {
		const mocks = [
			{ distance: 1, type: 'Walk' },
			{ distance: 2, type: 'Walk' },
			{ distance: 3, type: 'Walk' },
			{ distance: 4, type: 'Run' },
			{ distance: 5, type: 'Run' },
			{ distance: 6, type: 'Run' },
		] as ApiActivity[];

		expect(activityTypeDistances(mocks.slice(0, 3))).toStrictEqual({ Walk: 6 });
		expect(activityTypeDistances(mocks.slice(3))).toStrictEqual({ Run: 15 });
		expect(activityTypeDistances(mocks)).toStrictEqual({ Walk: 6, Run: 15 });
	});
});
