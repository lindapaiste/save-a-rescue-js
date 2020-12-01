import {useEntitiesSelector} from "../redux/store";
import {
    getAnimalAttributes,
    getAnimalAvatarSrc,
    getAnimalBreedNames,
    getAnimalOrgId,
    getAnimalPrimaryImage, getAttribute
} from "../redux/selectors";
import {Loading} from "../loading/Loading";
import {PetCard} from "../pet-card/PetCard";
import React from "react";

export const ConnectedPetCard = ({id}: { id: string }) => {

    const attributes = useEntitiesSelector(getAnimalAttributes(id));

    const breeds = useEntitiesSelector(getAnimalBreedNames(id));

    const image = useEntitiesSelector(getAnimalPrimaryImage(id));

    const avatar = useEntitiesSelector(getAnimalAvatarSrc(id));

    //TODO: get org citystate, but unsure of where to place require

    const orgId = useEntitiesSelector(getAnimalOrgId(id)) || "";

    const citystate = useEntitiesSelector(getAttribute('orgs', orgId, 'citystate'));

    if (!attributes) {
        return (
            <Loading size={50}/>
        )
    }
    return (
        <PetCard
            id={id}
            name={attributes.name}
            breeds={breeds}
            coat={attributes.coatLength}
            age={attributes.ageGroup}
            sex={attributes.sex}
            distance={attributes.distance}
            citystate={citystate}
            image={image}
            avatar={avatar}
        />
    )
}
