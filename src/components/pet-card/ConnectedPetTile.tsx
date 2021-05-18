import React from "react";
import { useEntitiesSelector } from "../../services/store";
import { getAnimalPrimaryImage } from "../../services/rescuegroups-api/entities/selectors";
import { Loading } from "../loading/Loading";
import { SquareImage } from "../media/SquareImage";
import { PetLink } from "../../services/routing/links/PetLink";

export const LoadingPetTile = () => (
  <div className="pet-tile">
    <Loading size={50} />
  </div>
);

export const ConnectedPetTile = ({ id }: { id: string }) => {
  const image = useEntitiesSelector(getAnimalPrimaryImage(id));

  if (!image) {
    return <LoadingPetTile />;
  }
  return (
    <PetLink id={id}>
      <div className="pet-tile">
        <SquareImage {...image} />
      </div>
    </PetLink>
  );
};
