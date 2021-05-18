import React from "react";
import { useEntitiesSelector, useSelector } from "../../services/store";
import { useRequireAnimal } from "../../services/rescuegroups-api/entities/useRequireEntity";
import {
  getAnimalPrimaryImage,
  getAttribute,
} from "../../services/rescuegroups-api/entities/selectors";
import { SquareImage } from "../media/SquareImage";
import { selectRecentlyViewed } from "../../services/recently-viewed/recent";
import { PetLink } from "../../services/routing/links/PetLink";

export const LinkedThumb = ({ id }: { id: string }) => {
  useRequireAnimal(id);

  const name = useEntitiesSelector(getAttribute("animals", id, "name")) || "";
  const image = useEntitiesSelector(getAnimalPrimaryImage(id));

  return (
    <PetLink id={id} className="recent-pet">
      {image ? <SquareImage {...image} wrapperClass="image" /> : <div />}
      <span className="name">{name}</span>
    </PetLink>
  );
};

/**
 * takes prop ignored in order to exclude the current page
 */
export interface Props {
  ignored?: string;
  max?: number;
}

// TODO: carousel
// TODO: persist via local storage

export const RecentlyViewed = ({ ignored, max = 6 }: Props) => {
  const all = useSelector(selectRecentlyViewed);
  const ids = all.filter((id) => id !== ignored).slice(0, max);

  if (!ids.length) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <h3>Recently Viewed</h3>
      <div className="thumbs">
        {ids.map((id) => (
          <LinkedThumb key={id} id={id} />
        ))}
      </div>
    </div>
  );
};
