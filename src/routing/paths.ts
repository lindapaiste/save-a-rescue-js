/**
 * defining these as functions because they will change
 */
import {MaybeDogOrCat} from "../strings/species";
import {SearchFormState} from "../search-box/types";

export const petProfile = (id: string): string => `/pet/${id}`;

export const searchAdoptables = (): string => `/`;

export const breedAdoptables = (id: string): string => `/breed/${id}`;

//export const search = (species: MaybeDogOrCat | undefined, zip: string | undefined, state: Partial<SearchFormState>)

export type AppPage = {
    type: 'pet';
    id: string;
} | {
    type: 'search';
    state?: Partial<SearchFormState>;
} | {
    type: 'breed';
    id: string;
}

export interface Linkable {
    pathname: string;
    search?: string;
    state?: any;
}
