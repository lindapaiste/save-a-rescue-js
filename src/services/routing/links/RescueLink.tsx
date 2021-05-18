import React from "react";
import { useEntitiesSelector } from "../../store";
import { getAttribute } from "../../rescuegroups-api/entities/selectors";

/**
 * Placeholder for an eventual link to a rescue organization page.
 *
 * Anchor text is the org name.
 */
export const RescueLink = ({ id }: { id: string }) => {
  const name = useEntitiesSelector(getAttribute("orgs", id, "name"));

  return <span>{name}</span>;
};
