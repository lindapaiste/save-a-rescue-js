import {TitleProps, titleString} from "../src/seo/titles";
import {DogOrCat} from "../src/strings/species";
import omit from "lodash/omit";
import pick from "lodash/pick";

test( "drop various properties from a complete search for Persian Cat Kittens in Houston, TX", () => {
    const complete: Required<TitleProps> = {
        species: DogOrCat.CAT,
        breed: "Persian",
        age: "Baby",
        sex: "Female",
        size: "Large",
        location: {
            city: "Houston",
            stateCode: "TX"
        },
    };

    const {species, breed, age, location, sex, size} = complete;

    expect(titleString(complete)).toEqual(
        "Adopt a Large Female Persian Kitten in Houston, TX"
    )

    expect(titleString(omit(complete, 'breed'))).toEqual(
        "Adopt a Large Female Kitten in Houston, TX"
    )

    expect(titleString(omit(complete, 'age'))).toEqual(
        "Adopt a Large Female Persian Cat or Kitten in Houston, TX"
    )

    expect(titleString(omit(complete, 'sex'))).toEqual(
        "Adopt a Large Persian Kitten in Houston, TX"
    )

    expect(titleString(omit(complete, 'size'))).toEqual(
        "Adopt a Female Persian Kitten in Houston, TX"
    )

    expect(titleString(omit(complete, 'location'))).toEqual(
        "Adopt a Female Persian Kitten Near You"
    )

    expect(titleString({...complete, age: "Adult"})).toEqual(
        "Adopt a Large Adult Female Persian Cat in Houston, TX"
    )

    expect(titleString({species})).toEqual(
        "Adopt a Cat Near You"
    )

    expect(titleString({species, breed})).toEqual(
        "Adopt a Persian Cat Near You"
    )

    expect(titleString({location, size})).toEqual(
        "Adopt a Large Cat or Dog in Houston, TX"
    )

    expect(titleString({location, age})).toEqual(
        "Adopt a Kitten or Puppy in Houston, TX"
    )

});
