import React from "react";

/**
 * For compliance with RescueGroups rules,
 * need to render a tracking pixel when using non-html description.
 */
export const Tracker = ({ id }: { id: string }) => {
  return (
    <img
      src={`https://tracker.rescuegroups.org/pet?${id}`}
      width="0"
      height="0"
      alt=""
    />
  );
};
