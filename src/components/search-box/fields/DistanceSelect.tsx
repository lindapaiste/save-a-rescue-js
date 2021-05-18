import { UNLIMITED_DISTANCE } from "../../../services/rescuegroups-api/schema/enums";

const mileNumbers = [25, 50, 100, 200];

export const isUnlimited = (val: unknown): boolean =>
  val === UNLIMITED_DISTANCE;

export const distanceOptions = mileNumbers
  .map((n) => ({
    label: `${n} miles`,
    value: n,
  }))
  .concat({
    label: "Any Distance",
    value: UNLIMITED_DISTANCE,
  });
