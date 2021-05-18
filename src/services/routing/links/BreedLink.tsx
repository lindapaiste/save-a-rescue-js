import React from "react";
import { useEntitiesSelector } from "../../store";
import { getAttribute } from "../../rescuegroups-api/entities/selectors";

/**
 * Looks up the name from the redux state.
 * Placeholder for an eventual link to a breed page.
 */
export const BreedLink = ({ id }: { id: string }) => {
  const name = useEntitiesSelector(getAttribute("breeds", id, "name"));

  return <span>{name}</span>;
};
