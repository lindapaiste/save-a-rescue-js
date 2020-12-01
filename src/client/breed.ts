import {DogOrCat} from "../strings/species";

export interface BreedObject {
    name: string;
    id: string;
    species: DogOrCat;
    // include WP id here??
}
