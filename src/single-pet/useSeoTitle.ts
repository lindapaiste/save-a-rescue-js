import {PropSpecies, speciesLabel} from "../strings/species";
import {Animal} from "../client/attributes";
import {useEntitiesSelector} from "../redux/store";
import {getAttribute} from "../redux/selectors";

export const useSeoTitle = ({attributes, species, orgId}: PropSpecies & {attributes: Partial<Animal>; orgId: string;}): void => {
    //could more elegantly drop undefined, but oh well
    const citystate = useEntitiesSelector(getAttribute('orgs', orgId, 'citystate')) || '';
    const {name = '', breedString = '', ageGroup} = attributes;
    const animal = speciesLabel(species, ageGroup === 'Baby' ? 'youngSingular' : 'singular');
    document.title = `Adopt ${name}: a ${breedString} ${animal} in ${citystate} - SaveARescue.org`;
}
