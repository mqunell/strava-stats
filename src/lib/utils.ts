export const rounded = (num: number): number => Number(num.toFixed(2))

export const metersToMiles = (meters: number): number => {
	const miles = meters / 1609.344
	return miles
}

export const milesToMeters = (miles: number): number => {
	const meters = miles * 1609.344
	return meters
}

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
	const result = {} as Pick<T, K>

	keys.forEach((key) => {
		if (key in obj) {
			result[key] = obj[key]
		}
	})

	return result
}

type PaginationParams<T> = {
	data: T[]
	limit?: number
	page?: number
}

export const paginate = <T>({ data, limit = 30, page = 0 }: PaginationParams<T>): T[] => {
	const stop = limit || 30
	const start = page ? (page - 1) * stop : 0

	return data.slice(start, start + stop)
}

export const paginateReverse = <T>({ data, limit = 8, page = 0 }: PaginationParams<T>): T[] => {
	const start = Math.max(data.length - (page + 1) * limit, 0)
	const stop = data.length - page * limit

	return data.slice(start, stop)
}
