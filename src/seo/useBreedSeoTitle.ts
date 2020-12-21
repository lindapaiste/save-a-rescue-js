import {useParams} from "react-router-dom";
import {BreedParams} from "../routing/useBreedTab";
import startCase from "lodash/startCase";

const toTitle = (tab: string, breedName: string): string => {
    switch (tab.toLowerCase()) {
        case "history":
            return `${breedName} Dog Breed History`;
        case "care":
            return `How to Care for a ${breedName} Puppy or Dog`;
        case "rescues":
            return `${breedName} Puppy & Dog Rescue Organizations`;
        case "adopt":
            return `Adopt ${breedName} Puppies & Dogs`;
        default:
            return `${breedName} Dog Breed Facts`;
    }
}

export const useBreedSeoTitle = (): void => {
    const {slug, tab = ""} = useParams<BreedParams>();
    const base = toTitle(tab, startCase(slug));
    //TODO: get actual breed name

    document.title = `${base} - SaveARescue.org`;
}
