const mileNumbers = [25, 50, 100, 200];

export const distanceOptions = mileNumbers.map(n => ({
    label: n + " miles",
    value: n,
})).concat({
    label: "Any Distance",
    value: 100000,
});
