import { omit } from "lodash";
import { DogOrCat } from "../species/species";
import { makeTitleString, TitleProps } from "./useSearchSeoTitle";

test("drop various properties from a complete search for Persian Cat Kittens in Houston, TX", () => {
  const complete: Required<TitleProps> = {
    species: DogOrCat.CAT,
    breed: "Persian",
    age: "Baby",
    sex: "Female",
    size: "Large",
    cityState: "Houston, TX",
  };

  const { species, breed, age, cityState, size } = complete;

  expect(makeTitleString(complete)).toEqual(
    "Adopt a Large Female Persian Kitten in Houston, TX"
  );

  expect(makeTitleString(omit(complete, "breed"))).toEqual(
    "Adopt a Large Female Kitten in Houston, TX"
  );

  expect(makeTitleString(omit(complete, "age"))).toEqual(
    "Adopt a Large Female Persian Cat or Kitten in Houston, TX"
  );

  expect(makeTitleString(omit(complete, "sex"))).toEqual(
    "Adopt a Large Persian Kitten in Houston, TX"
  );

  expect(makeTitleString(omit(complete, "size"))).toEqual(
    "Adopt a Female Persian Kitten in Houston, TX"
  );

  expect(makeTitleString(omit(complete, "location"))).toEqual(
    "Adopt a Female Persian Kitten Near You"
  );

  expect(makeTitleString({ ...complete, age: "Adult" })).toEqual(
    "Adopt a Large Adult Female Persian Cat in Houston, TX"
  );

  expect(makeTitleString({ species })).toEqual("Adopt a Cat Near You");

  expect(makeTitleString({ species, breed })).toEqual(
    "Adopt a Persian Cat Near You"
  );

  expect(makeTitleString({ cityState, size })).toEqual(
    "Adopt a Large Cat or Dog in Houston, TX"
  );

  expect(makeTitleString({ cityState, age })).toEqual(
    "Adopt a Kitten or Puppy in Houston, TX"
  );
});
