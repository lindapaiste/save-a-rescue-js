const mileNumbers = [25, 50, 100, 200];

export const UNLIMITED_DISTANCE = 100000;

export const isUnlimited = (val: any): boolean => val === UNLIMITED_DISTANCE

export const distanceOptions = mileNumbers.map(n => ({
    label: n + " miles",
    value: n,
})).concat({
    label: "Any Distance",
    value: UNLIMITED_DISTANCE,
});
