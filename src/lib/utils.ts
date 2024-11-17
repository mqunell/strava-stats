export const rounded = (num: number): number => Number(num.toFixed(2))

export const metersToMiles = (meters: number): number => meters / 1609.344
export const milesToMeters = (miles: number): number => miles * 1609.344
export const mpsToMph = (meters: number): number => meters * 2.23693629

export const displaySeconds = (seconds: number): string => {
	let minutes = Math.floor(seconds / 60)
	seconds = seconds % 60

	let hours = Math.floor(minutes / 60)
	minutes = minutes % 60

	let days = Math.floor(hours / 24)
	hours = hours % 24

	const pad = (n: number): string => n.toString().padStart(2, '0')
	return [days, pad(hours), pad(minutes), pad(seconds)].join(':')
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
