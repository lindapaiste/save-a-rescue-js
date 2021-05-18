import { PropSpecies, speciesLabel } from "../species/species";
import { Animal } from "../rescuegroups-api/schema/attributes";
import { useEntitiesSelector } from "../store";
import { getAttribute } from "../rescuegroups-api/entities/selectors";
import { useSeoTitle } from "./useSeoTitle";

export const usePetSeoTitle = ({
  attributes,
  species,
  orgId,
}: PropSpecies & { attributes: Partial<Animal>; orgId: string }): void => {
  // could more elegantly drop undefined, but oh well
  const citystate =
    useEntitiesSelector(getAttribute("orgs", orgId, "citystate")) || "";
  const { name = "", breedString = "", ageGroup } = attributes;
  const animal = speciesLabel(
    species,
    ageGroup === "Baby" ? "youngSingular" : "singular"
  );
  const pageTitle = `Adopt ${name}: a ${breedString} ${animal} in ${citystate}`;
  useSeoTitle(pageTitle);
};
