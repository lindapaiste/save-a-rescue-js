import React, { useMemo } from "react";
import { useSearchResults } from "../../services/search/useSearchResults";
import { useRequireEntity } from "../../services/rescuegroups-api/entities/useRequireEntity";
import { useEntitiesSelector } from "../../services/store";
import {
  getAttribute,
  getRelatedIds,
} from "../../services/rescuegroups-api/entities/selectors";
import {
  isCat,
  MaybeDogOrCat,
  normalizeSpecies,
} from "../../services/species/species";
import { RenderSearchResults } from "./SearchResults";
import { BreedLocationBox } from "../search-box/breed-location/BreedLocation";
import { useUserLocation } from "../../services/location/useUserLocation";
import { Placement } from "../pet-card/types";

/**
 * breed search should have big prompt for location, collapsed extra filters
 *
 * checkbox for purebred only
 */
export const BreedResults = ({
  id,
  name,
  species,
}: {
  id: string;
  name: string;
  species: MaybeDogOrCat;
}) => {
  const location = useUserLocation();

  const args = useMemo(() => {
    const key = isCat(species) ? "breedCats" : "breedDogs";
    return {
      [key]: [
        {
          label: name,
          value: id,
        },
      ],
      species,
      location,
    };
  }, [id, name, species, location]);

  const results = useSearchResults(args);

  return (
    <>
      {location === undefined && <BreedLocationBox species={species} />}
      <RenderSearchResults
        {...results}
        species={species}
        placement={Placement.BREED_ADOPTABLE}
      />
    </>
  );
};

export const BreedResultsFromId = ({ id }: { id: string }) => {
  useRequireEntity({ type: "breeds", id });

  const speciesRaw = useEntitiesSelector(
    getRelatedIds("breeds", id, "species")
  )[0];

  const species = normalizeSpecies(speciesRaw);

  const name = useEntitiesSelector(getAttribute("breeds", id, "name")) || "";

  return <BreedResults id={id} species={species} name={name} />;
};
