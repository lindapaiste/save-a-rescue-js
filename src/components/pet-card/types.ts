import { MaybeDogOrCat } from "../../services/species/species";
import { SrcSet } from "../media/types";

export interface PetCardData {
  id: string;
  name: string;
  breeds: string[];
  coat?: string;
  age?: string;
  sex?: string;
  distance?: number;
  citystate?: string;
  image?: SrcSet;
  avatar?: string;
  species?: MaybeDogOrCat; // TODO: use for age and fallback image
}

export interface PetCardProps extends PetCardData {
  horizontal?: boolean;
  placement: Placement;
}

export enum Placement {
  HOME_PAGE,
  BREED_ADOPTABLE,
  SEARCH_ADOPTABLE,
  RECENTLY_VIEWED,
  ORG_ADOPTABLE,
}
