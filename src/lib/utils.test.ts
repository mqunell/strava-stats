import { pick } from './utils';

describe('utils', () => {
	test('pick', () => {
		const obj = { a: '1', b: '2', c: '3', d: '4', e: '5' };

		expect(pick(obj, [])).toEqual({});
		expect(pick(obj, ['a', 'e'])).toEqual({ a: '1', e: '5' });
		expect(pick(obj, ['b', 'd', 'x'])).toEqual({ b: '2', d: '4' });
		expect(pick(obj, ['y', 'z'])).toEqual({});
	});
});
