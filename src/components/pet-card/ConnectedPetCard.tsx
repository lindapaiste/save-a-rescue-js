import React from "react";
import { useEntitiesSelector } from "../../services/store";
import {
  getAllAttributes,
  getAnimalAttributes,
  getAnimalAvatarSrc,
  getAnimalBreedNames,
  getAnimalOrgId,
  getAnimalPrimaryImage,
  getAnimalSpecies,
} from "../../services/rescuegroups-api/entities/selectors";
import { Loading } from "../loading/Loading";
import { PetCard } from "./PetCard";
import { cityState } from "../../util/strings/city";
import { useRequireAnimal } from "../../services/rescuegroups-api/entities/useRequireEntity";
import { PetCardData, PetCardProps } from "./types";
import { PetLink } from "../../services/routing/links/PetLink";

export const ConnectedPetCard = ({
  id,
  ...passed
}: { id: string } & Omit<PetCardProps, keyof PetCardData>) => {
  useRequireAnimal(id);

  const attributes = useEntitiesSelector(getAnimalAttributes(id));

  const breeds = useEntitiesSelector(getAnimalBreedNames(id));

  const image = useEntitiesSelector(getAnimalPrimaryImage(id));

  const avatar = useEntitiesSelector(getAnimalAvatarSrc(id));

  const species = useEntitiesSelector(getAnimalSpecies(id));

  const orgId = useEntitiesSelector(getAnimalOrgId(id)) || "";

  const orgAttr = useEntitiesSelector(getAllAttributes("orgs")(orgId));
  const citystate = cityState(orgAttr);

  if (!attributes) {
    return <Loading size={50} />;
  }
  return (
    <PetLink id={id}>
      <PetCard
        {...passed}
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
        species={species}
      />
    </PetLink>
  );
};
