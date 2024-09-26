export const rounded = (num: number): number => Number(num.toFixed(2));

export const metersToMiles = (meters: number): number => {
	const miles = meters / 1609.344;
	return miles;
};

export const milesToMeters = (miles: number): number => {
	const meters = miles * 1609.344;
	return meters;
};
