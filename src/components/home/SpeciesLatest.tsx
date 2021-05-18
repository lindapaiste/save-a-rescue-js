import { range } from "lodash";
import React, { useMemo } from "react";
import { DogOrCat, speciesLabel } from "../../services/species/species";
import { useUserLocation } from "../../services/location/useUserLocation";
import { SearchFormState } from "../search-box/types";
import { useSearchResults } from "../../services/search/useSearchResults";
import { Placement } from "../pet-card/types";
import { ConnectedPetCard } from "../pet-card/ConnectedPetCard";
import { LoadingCard } from "../pet-card/LoadingCard";
import { ChevronHoverButton } from "../elements/chevron-button/ChevronHoverButton";
import { SearchLink } from "../../services/routing/links/SearchLink";
import { Slider } from "../elements/slider/Slider";
import "./species-latest.less";

export interface Props {
  species: DogOrCat;
  count?: number;
}

/**
 * IDEA: sort by newest first -- but if doing that, need to limit the distance
 * probably need to progressively increase radius if no matches on smallest
 * if limiting radius, also need to do a global search in order to get the total count
 */
export const SpeciesLatest = ({ species, count = 12 }: Props) => {
  const location = useUserLocation();

  const args: Partial<SearchFormState> = useMemo(
    () => ({
      location,
      species,
      // sort: SearchSort.NEWEST,
      hasPic: true,
    }),
    [location, species]
  );

  const results = useSearchResults(args);

  const loadedIds = results.animalIds ?? [];
  const items: (string | undefined)[] = range(0, count).map(
    (n) => loadedIds[n]
  );

  const speciesName = speciesLabel(species, "plural");

  return (
    <section
      className={`home-adoptable-pets home-adoptable-${speciesName.toLowerCase()}`}
    >
      <h2>
        Adoptable <span className="species">{speciesName}</span>
      </h2>
      <Slider
        dots={false}
        arrows
        slidesToShow={4}
        responsive={[
          {
            breakpoint: 940,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {items?.map((id, i) => (
          <div
            className="pet-card-grid-wrapper"
            // I'm not sure what else could be used as a key here since the id isn't known yet.
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          >
            {id ? (
              <ConnectedPetCard id={id} placement={Placement.HOME_PAGE} />
            ) : (
              <LoadingCard />
            )}
          </div>
        ))}
      </Slider>
      <SearchLink species={species} location={location}>
        <ChevronHoverButton type="primary">
          View All {results.total?.toLocaleString() || "Adoptable"}{" "}
          {speciesName}
        </ChevronHoverButton>
      </SearchLink>
    </section>
  );
};
