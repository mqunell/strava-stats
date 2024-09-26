// Distances are in meters unless otherwise noted
// Times are in minutes

// GET:/athlete
type ApiAthlete = {
	id: number;
	firstname: string;
	lastname: string;
	created_at: string;
	updated_at: string;
	bikes: ApiGear[];
	shoes: ApiGear[];
	[unused: string]: unknown;
};

// Note: Despite having a "retired" field, retired gear is not provided
type ApiGear = {
	id: string;
	name: string;
	distance: number; // meters, ex. 2765462
	converted_distance: number; // miles, ex. 1718.4
	[unused: string]: unknown;
};

// GET:/athlete/activities
type ApiActivity = {
	id: number;
	name: string;
	distance: number;
	start_date: string; // YYYY-MM-DDTHH:MM:SSZ UTC
	start_date_local: string; // YYYY-MM-DDTHH:MM:SSZ local
	moving_time: number;
	elapsed_time: number;
	total_elevation_gain: number;
	type: string; // 'Walk' | 'Run' | 'Ride'
	athlete_count: number;
	gear_id: string | null; // GearResponse.id
	average_speed: number; // meters per second
	max_speed: number;
	elev_low: number;
	elev_high: number;
	average_heartrate: number;
	max_heartrate: number;
	[unused: string]: unknown;
};

// GET:/athletes/{id}/stats
type ApiStats = {
	recent_ride_totals: ApiStatPeriod;
	ytd_ride_totals: ApiStatPeriod;
	all_ride_totals: ApiStatPeriod;
	recent_run_totals: ApiStatPeriod;
	all_run_totals: ApiStatPeriod;
	ytd_run_totals: ApiStatPeriod;
	[unused: string]: unknown;
};

type ApiStatPeriod = {
	count: number;
	distance: number;
	moving_time: number;
	elapsed_time: number;
	elevation_gain: number;
	[unused: string]: unknown;
};
