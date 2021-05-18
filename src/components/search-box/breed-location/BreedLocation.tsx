import "./breed-location.less";
import React from "react";
import { MaybeDogOrCat, speciesLabel } from "../../../services/species/species";
import { LocationSelect } from "../location/LocationSelect";
import { MinimalRenderLocationSelect } from "../location/RenderWithGps";

/**
 * show a huge banner on breed results to enter a location if a location is not already known
 */

// TODO: rem sizing only works if shrinking base size based on screen

export const BreedLocationBox = ({ species }: { species: MaybeDogOrCat }) => {
  return (
    <div className="center-contents">
      <div className="breed-search-location">
        <div className="label">
          Find {speciesLabel(species, "plural")} Near You:
        </div>
        <LocationSelect Render={MinimalRenderLocationSelect} />
      </div>
    </div>
  );
};
