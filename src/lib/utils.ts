export const metersToMiles = (meters: number): number => {
	const miles = meters / 1609.344;
	return Number(miles.toFixed(2));
};

export const milesToMeters = (miles: number): number => {
	const meters = miles * 1609.344;
	return Number(meters.toFixed(2));
};
