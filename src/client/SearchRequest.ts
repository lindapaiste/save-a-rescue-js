import {AttributeFilter, FilterLocation, RequestData, RequestParams} from "./request";
import {DogOrCat, EITHER_VAL, idToSlug, isCat, isDog} from "../strings/species";
import {SearchFormState} from "../search-box/types";
import {createFilter} from "./filtering";
import {RequestArgs} from "./Client";
import {BasicOption} from "../search-box/fields/options";

/**
 * class is responsible for turning args from search box into an executable request
 */
export class SearchRequest implements RequestArgs {

    public readonly url: string;
    public readonly data: RequestData = {};
    public readonly params: RequestParams = {};
    public readonly method = 'POST';

    constructor(args: Partial<SearchFormState>, page: number = 1) {

        /**
         * use an arbitrary high number for distance as a stand-in for unlimited
         */
        const {distance = 100000, location, species, ages, sex, sizes, pureBreed} = args;
        const breed = getBreed(args);

        /**
         * set URL based on species
         */
        let url = '/animals/search/available';
        const slug = idToSlug(species);
        if (slug) {
            url += '/' + slug;
        }
        else {
            /**
             * never want to show more than dogs and cats
             */
            this.addFilter(createFilter('species', 'id', [DogOrCat.CAT, DogOrCat.DOG] ))
        }
        this.url = url;

        /**
         * set params - includes and pagination
         */
        this.params.page = page;
        this.params.limit = 24;

        /**
         * set location filter
         */
        if (location && distance) {
            this.data.filterRadius = {
                ...location,
                miles: distance
            }
            this.params.sort = 'animals.distance';
            //this.params.sort = '-animals.createdDate';

        }

        /**
         * set attribute filters
         */
        if (ages && ages.length) {
            this.addFilter(createFilter('animals', 'ageGroup', ages));
        }
        if (sizes && sizes.length) {
            this.addFilter(createFilter('animals', 'sizeGroup', sizes));
        }
        if (sex && sex.length) {
            this.addFilter(createFilter('animals', 'sex', sex));
        }
        if (breed && breed.length) {
            this.addFilter(createFilter('breeds', 'id', breedsToIds(breed)));
        }

        if (pureBreed) {
            this.addFilter(createFilter('animals', 'isBreedMixed', true, 'notequal'));
            this.addFilter(createFilter('animals', 'breedSecondaryId', 0, 'blank'));
        }

        console.log(args, this.data);

    }

    private addFilter(filter: AttributeFilter): void {
        if (!this.data.filters) {
            this.data.filters = [];
        }
        this.data.filters.push(filter);
    }
}



const breedIds = (args: Partial<SearchFormState>): string[] => {
    return breedsToIds(getBreed(args));
}

export const getBreed = ({breedCats = [], breedDogs = [], species}: Partial<SearchFormState>): (string | BasicOption)[] => {
    return isDog(species) ? breedDogs : isCat(species) ? breedCats : [];
}

const breedsToIds = (breeds: (string | BasicOption)[]): string[] => {
    return breeds.map(o => typeof o === "string" ? o : o.value)
}

/**
 * key doesn't need to make sense or be readable, just needs to be consistent
 */
export const createKey = (args: Partial<SearchFormState>, page: number = 1): string => {
    const {species = EITHER_VAL, pureBreed, location, distance, sex, sizes, ages} = args;
    let key = "search";
    key += species;
    const breed = getBreed(args);
    if (breed?.length) {
        key += "&breed=" + breedsToIds(breed).join(",");
    }
    if (ages?.length) {
        key += "&ages=" + ages.join(",");
    }
    if (sizes?.length) {
        key += "&size=" + sizes.join(",");
    }
    if (pureBreed) {
        key += "&pureBreed";
    }
    if (sex?.length) {
        key += "&sex=" + sex.join(",");
    }
    if (distance) {
        key += "&distance=" + distance;
    }
    if (location) {
        key += "&location=" + locString(location);
    }
    return key + "&page=" + page;
}

const locString = (location: FilterLocation): string => {
    if ("postalcode" in location) {
        return location.postalcode.toString();
    }
    if ("coordinates" in location) {
        return location.coordinates;
    } else {
        return location.lat + "," + location.lon;
    }
}
