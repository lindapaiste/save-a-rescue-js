import {useEntitiesSelector} from "../redux/store";
import {
    getAllAttributes,
    getAnimalAttributes,
    getAnimalAvatarSrc,
    getAnimalBreedNames,
    getAnimalOrgId,
    getAnimalPrimaryImage,
    getAnimalSpecies
} from "../redux/rgSelectors";
import {Loading} from "../loading/Loading";
import {PetCard} from "../pet-card/PetCard";
import React from "react";
import {cityState} from "../strings/city";
import {useRequireAnimal} from "./useRequireEntity";
import {PetCardData, PetCardProps} from "../pet-card/types";
import {PetLink} from "../routing/PetLink";

export const usePetCardProps = (id: string): PetCardData | undefined => {

    useRequireAnimal(id);

    const attributes = useEntitiesSelector(getAnimalAttributes(id));

    const breeds = useEntitiesSelector(getAnimalBreedNames(id));

    const image = useEntitiesSelector(getAnimalPrimaryImage(id));

    const avatar = useEntitiesSelector(getAnimalAvatarSrc(id));

    const species = useEntitiesSelector(getAnimalSpecies(id));

    //TODO: get org citystate, but unsure of where to place require

    const orgId = useEntitiesSelector(getAnimalOrgId(id)) || "";

    const orgAttr = useEntitiesSelector(getAllAttributes('orgs')(orgId));
    const citystate = cityState(orgAttr);
    //const citystate = useEntitiesSelector(getAttribute('orgs', orgId, 'citystate'));

    if ( !attributes) {
        return undefined;
    }

    return {
        id,
        ...attributes,
        breeds,
        coat: attributes.coatLength,
        age: attributes.ageGroup,
        sex: attributes.sex,
        distance: attributes.distance,
        citystate,
        image,
        avatar,
        species
    }
}

export const ConnectedPetCard = ({id, ...passed}: { id: string } & Omit<PetCardProps, keyof PetCardData>) => {

    const props = usePetCardProps(id);

    if (!props) {
        return (
            <Loading size={50}/>
        )
    }
    return (
        <PetLink id={id}>
            <PetCard {...passed} {...props} />
        </PetLink>
    )
}
