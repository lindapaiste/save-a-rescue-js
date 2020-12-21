import {AttributeFilter, FilterLocation, RgRequestData, RgRequestParams} from "./request";
import {DogOrCat, EITHER_VAL, isCat, isDog, isDogOrCat} from "../strings/species";
import {SearchFormState, SearchSort} from "../search-box/types";
import {createFilter} from "./filtering";
import {RgRequestArgs} from "./RgClient";
import {BasicOption} from "../search-box/fields/options";
import {toFilterLocation} from "../location/validation";
import qs from "qs";
import omit from "lodash/omit";
import {UNLIMITED_DISTANCE} from "../search-box/fields/DistanceSelect";

/**
 * class is responsible for turning args from search box into an executable request
 */
export class SearchRequest implements RgRequestArgs {

    public readonly url: string;
    public readonly data: RgRequestData = {};
    public readonly params: RgRequestParams = {};
    public readonly method = 'POST';
    private keyParts: string[] = [];
    public readonly key: string;

    constructor(args: Partial<SearchFormState>, page: number = 1) {

        console.log(args);

        const {distance, location, species, ages, sex, sizes, pureBreed, org, sort = SearchSort.NEAREST, hasPic} = args;
        const breed = getBreed(args);

        /**
         * set URL based on species
         */
        this.url = '/animals/search/available';

            /**
             * never want to show more than dogs and cats
             */
            const id = isDogOrCat(species) ? species : [DogOrCat.CAT, DogOrCat.DOG];
            this.addFilter(createFilter('species', 'id', id ))

            //this.addFilter(createFilter('statuses', 'name', 'Available' ))

        /**
         * set params - includes and pagination
         */
        this.params.page = page;
        this.params.limit = 24;


        /**
         * set location filter
         * use an arbitrary high number for distance as a stand-in for unlimited
         */
        if (location) {
            const distVal = typeof distance === "number" ? distance :
                typeof distance === "string" ? parseInt(distance) : UNLIMITED_DISTANCE //handle 0
            const filterLoc = toFilterLocation(location);
            this.data.filterRadius = {
                ...filterLoc,
                miles: distVal
            }
            this.addKeyPart("location", locString(filterLoc));
            this.addKeyPart("miles", distVal.toString());
            if ( sort === SearchSort.NEAREST ) {
                this.params.sort = 'animals.distance';
            }
        }

        //TODO: reach out to rescue groups about why this doesn't work
        if ( sort === SearchSort.NEWEST ) {
            this.params.sort = '-animals.createdDate';
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

        if (org) {
            this.addFilter(createFilter('orgs', 'id', org ) ); //could handle slug or id
        }

        if (hasPic) {
            this.addFilter(createFilter('animals', 'pictureCount', 1, 'greaterthanorequal'));
        }

        /**
         * non-filters need to be set as keyParts
         * page number is NOT part of the key
         */
        this.keyParts.push( this.url, qs.stringify(omit(this.params, 'page')) );
        //this.keyParts.sort(); sort is not necessary since filters are added in the same order evey time
        this.key = this.keyParts.join('&');
    }

    private addFilter(filter: AttributeFilter): void {
        if (!this.data.filters) {
            this.data.filters = [];
        }
        this.data.filters.push(filter);
        this.addKeyPart(filter.fieldName, filter.criteria);
    }

    private addKeyPart(label: string, value: any): void {
        const stringVal = Array.isArray(value) ? value.map(el => el.toString()).join(',') : value.toString();
        this.keyParts.push(`${label}=${stringVal}`);
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
    const {species = EITHER_VAL, pureBreed, location, distance, sex, sizes, ages, org} = args;
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
        key += "&location=" + locString(toFilterLocation(location));
    }
    if (org) {
        key += "&org=" + org;
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
