// Distances are in meters unless otherwise noted
// Times are in minutes

// GET:/athlete
type ApiAthlete = {
	id: number
	firstname: string
	lastname: string
	created_at: string
	updated_at: string
	bikes: ApiGear[]
	shoes: ApiGear[]
}

// Note: Despite having a "retired" field, retired gear is not provided
type ApiGear = {
	id: string
	name: string
	distance: number // meters, ex. 2765462
	converted_distance: number // miles, ex. 1718.4
}

// GET:/athlete/activities
type ApiActivity = {
	id: number
	name: string
	distance: number
	start_date: string // YYYY-MM-DDTHH:MM:SSZ UTC
	start_date_local: string // YYYY-MM-DDTHH:MM:SSZ local
	moving_time: number
	elapsed_time: number
	total_elevation_gain: number
	type: string // 'Walk' | 'Run' | 'Ride'
	athlete_count: number
	gear_id: string | null // GearResponse.id
	average_speed: number // meters per second
	max_speed: number
	elev_low?: number // Rarely not included
	elev_high?: number // Rarely not included
	average_heartrate?: number // Rarely not included
	max_heartrate?: number // Rarely not included
}

// GET:/athletes/{id}/stats
type ApiStats = {
	recent_ride_totals: ApiStatPeriod
	ytd_ride_totals: ApiStatPeriod
	all_ride_totals: ApiStatPeriod
	recent_run_totals: ApiStatPeriod
	all_run_totals: ApiStatPeriod
	ytd_run_totals: ApiStatPeriod
}

type ApiStatPeriod = {
	count: number
	distance: number
	moving_time: number
	elapsed_time: number
	elevation_gain: number
}
