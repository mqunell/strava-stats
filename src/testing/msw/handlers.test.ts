import { paginate } from './handlers';

describe('handlers', () => {
	test('paginate', () => {
		let data = [];
		for (let i = 0; i < 100; i++) data.push(i);

		expect(paginate({ data })).toEqual(data.slice(0, 30));

		expect(paginate({ data, page: 1 })).toEqual(data.slice(0, 30));
		expect(paginate({ data, page: 2 })).toEqual(data.slice(30, 60));
		expect(paginate({ data, page: 3 })).toEqual(data.slice(60, 90));
		expect(paginate({ data, page: 4 })).toEqual(data.slice(90, 100));
		expect(paginate({ data, page: 5 })).toEqual([]);

		expect(paginate({ data, page: 1, perPage: 15 })).toEqual(data.slice(0, 15));
		expect(paginate({ data, page: 3, perPage: 20 })).toEqual(data.slice(40, 60));
		expect(paginate({ data, page: 5, perPage: 100 })).toEqual([]);

		expect(paginate({ data, perPage: 5 })).toEqual(data.slice(0, 5));
		expect(paginate({ data, perPage: 100 })).toEqual(data);
		expect(paginate({ data, perPage: 200 })).toEqual(data);
	});
});
