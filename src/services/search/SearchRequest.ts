import { DogOrCat, isDogOrCat } from "../species/species";
import { SearchFormState, SearchSort } from "../../components/search-box/types";
import { RgRequest } from "../rescuegroups-api/client/RgRequest";
import { RgRequestAction } from "../rescuegroups-api/client/Executable";
import { breedsToIds, getBreed } from "./searchArgHandling";

/**
 * Class is responsible for turning args from search box into an executable request.
 * Stores the page as an individual property, so doesn't need to be reconstructed
 * just to change the page.
 */
export class SearchRequest {
  public readonly type = "animals";

  private request: RgRequest<"animals">;

  constructor(args: Partial<SearchFormState>) {
    this.request = new RgRequest("animals", "/animals/search/available");

    const {
      distance,
      location,
      species,
      ages,
      sex,
      sizes,
      pureBreed,
      org,
      sort = SearchSort.NEAREST,
      hasPic,
    } = args;
    const breed = getBreed(args);

    /**
     * never want to show more than dogs and cats
     */
    const id = isDogOrCat(species) ? species : [DogOrCat.CAT, DogOrCat.DOG];
    this.request.addFilter("species", "id", id);

    // not needed if using /available in the url path
    // this.request.addFilter('statuses', 'name', 'Available' );

    /**
     * set params - includes and pagination
     */
    this.request.setLimit(24);

    /**
     * set location filter
     * use an arbitrary high number for distance as a stand-in for unlimited
     */
    if (location) {
      this.request.setLocation(location, distance);
      if (sort === SearchSort.NEAREST) {
        this.request.setSort("animals", "distance", "ASC");
      }
    }

    if (sort === SearchSort.NEWEST) {
      this.request.setSort("animals", "createdDate", "DESC");
    }

    /**
     * set attribute filters
     */
    if (ages && ages.length) {
      this.request.addFilter("animals", "ageGroup", ages);
    }
    if (sizes && sizes.length) {
      this.request.addFilter("animals", "sizeGroup", sizes);
    }
    if (sex && sex.length) {
      this.request.addFilter("animals", "sex", sex);
    }
    if (breed && breed.length) {
      this.request.addFilter("breeds", "id", breedsToIds(breed));
    }

    if (pureBreed) {
      this.request.addFilter("animals", "isBreedMixed", true, "notequal");
      this.request.addFilter("animals", "breedSecondaryId", 0, "blank");
    }

    if (org) {
      this.request.addFilter("orgs", "id", org); // could handle slug or id
    }

    if (hasPic) {
      this.request.addFilter(
        "animals",
        "pictureCount",
        1,
        "greaterthanorequal"
      );
    }
  }

  get key() {
    return this.request.key;
  }

  public setPage(page: number): this {
    this.request.setPage(page);
    return this;
  }

  public raw(): RgRequestAction {
    return this.request.raw();
  }
}
