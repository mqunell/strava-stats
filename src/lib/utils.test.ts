import { displaySeconds, paginate, paginateReverse, pick } from './utils'

describe('utils', () => {
	test('displaySeconds', () => {
		expect(displaySeconds(1)).toEqual('0:00:00:01')
		expect(displaySeconds(30)).toEqual('0:00:00:30')
		expect(displaySeconds(60)).toEqual('0:00:01:00')
		expect(displaySeconds(140)).toEqual('0:00:02:20')
		expect(displaySeconds(3600)).toEqual('0:01:00:00')
		expect(displaySeconds(9296)).toEqual('0:02:34:56')
		expect(displaySeconds(10983)).toEqual('0:03:03:03')
		expect(displaySeconds(86399)).toEqual('0:23:59:59')
		expect(displaySeconds(86400)).toEqual('1:00:00:00')
		expect(displaySeconds(360244)).toEqual('4:04:04:04')
	})

	test('pick', () => {
		const obj = { a: '1', b: '2', c: '3', d: '4', e: '5' }

		expect(pick(obj, [])).toEqual({})
		expect(pick(obj, ['a', 'e'])).toEqual({ a: '1', e: '5' })
		expect(pick(obj, ['b', 'd'])).toEqual({ b: '2', d: '4' })
	})

	test('paginate', () => {
		let data = []
		for (let i = 0; i < 100; i++) data.push(i)

		expect(paginate({ data })).toEqual(data.slice(0, 30))

		expect(paginate({ data, page: 1 })).toEqual(data.slice(0, 30))
		expect(paginate({ data, page: 2 })).toEqual(data.slice(30, 60))
		expect(paginate({ data, page: 3 })).toEqual(data.slice(60, 90))
		expect(paginate({ data, page: 4 })).toEqual(data.slice(90, 100))
		expect(paginate({ data, page: 5 })).toEqual([])

		expect(paginate({ data, limit: 5 })).toEqual(data.slice(0, 5))
		expect(paginate({ data, limit: 100 })).toEqual(data)
		expect(paginate({ data, limit: 200 })).toEqual(data)

		expect(paginate({ data, page: 1, limit: 15 })).toEqual(data.slice(0, 15))
		expect(paginate({ data, page: 3, limit: 20 })).toEqual(data.slice(40, 60))
		expect(paginate({ data, page: 5, limit: 100 })).toEqual([])
	})

	test('paginateReverse', () => {
		let data = []
		for (let i = 0; i < 20; i++) data.push(i)

		expect(paginateReverse({ data, page: 0, limit: 8 })).toEqual(data.slice(12, 20))
		expect(paginateReverse({ data, page: 1, limit: 8 })).toEqual(data.slice(4, 12))
		expect(paginateReverse({ data, page: 2, limit: 8 })).toEqual(data.slice(0, 4))
	})
})
