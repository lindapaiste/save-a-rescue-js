/**
 * defining these as functions because they will change
 */
import {MaybeDogOrCat} from "../strings/species";
import {SearchFormState} from "../search-box/types";
import {stateToSearch_} from "./usePetZipQueryParams";
import { useRouteMatch } from "react-router-dom";

export const petProfile = (id: string): string => `/adoptable-dogs-cats/pet/${id}`;

export const searchAdoptables = (): string => `/adoptable-dogs-cats/`;

export const breedAdoptables = (id: string): string => `/adoptable-dogs-cats/breed/${id}`;

export const breedMain = (slug: string): string => `/breed/${slug}`;

export const breedTab = (slug: string, tab?: string): string => tab ? `/breed/${slug}/${tab}` : breedMain(slug);

export const rescueListing = (slug: string): string => `/orgsandrescues/listing/${slug}`;

//export const search = (species: MaybeDogOrCat | undefined, zip: string | undefined, state: Partial<SearchFormState>)

export type AppPage = {
    type: 'pet';
    id: string;
} | {
    type: 'search';
    state?: Partial<SearchFormState>;
} | {
    type: 'breed';
    slug: string; //TODO: is slug, or id?
    tab?: string;
} | {
    type: 'rescue';
    slug: string;
}

export interface Linkable {
    pathname: string;
    search?: string;
    state?: any;
}

export const pageLink = (page: AppPage): Linkable => {
    switch (page.type) {
        case "pet":
            return {
                pathname: petProfile(page.id)
            }
        case "breed":
            return {
                pathname: breedTab(page.slug, page.tab)
            }
        case "rescue":
            return {
                pathname: rescueListing(page.slug)
            }
        case "search":
            return {
                pathname: searchAdoptables(),
                search: stateToSearch_(page.state),
                state: page.state
            }
        default:
            //@ts-ignore - need to ignore because this is unreachable if types are followed
            throw new Error("unknown page type " + page.type)
    }
}

export const useCurrentPage = () => {
    const {params} = useRouteMatch();
}
