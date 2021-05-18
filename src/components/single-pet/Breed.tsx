import React from "react";
import { uniq } from "lodash";
import { isDefined } from "@lindapaiste/ts-helpers";
import { Animal } from "../../services/rescuegroups-api/schema/attributes";
import { BreedLink } from "../../services/routing/links/BreedLink";
import { Join } from "../../util/Join";

/**
 * Render a breed text based on breedPrimaryId and breedSecondaryId,
 * which might not be defined.
 *
 * Show "Mixed Breed" if isBreedMixed is true and no breeds are present.
 *
 * Note: it occasionally happens that breedPrimaryId and breedSecondaryId are the same
 */
export const Breed = ({
  breedPrimaryId,
  breedSecondaryId,
  isBreedMixed,
}: Partial<Animal>) => {
  const hasBreed = !!breedPrimaryId || !!breedSecondaryId;
  if (!hasBreed) {
    return isBreedMixed ? <div className="breed">Mixed Breed</div> : null;
  }
  return (
    <div className="breed">
      <Join
        array={uniq([breedPrimaryId, breedSecondaryId])
          .filter(isDefined)
          .map((id) => (
            <BreedLink id={id.toString()} key={id} />
          ))}
        separator=" / "
      />
      {isBreedMixed && " Mix"}
    </div>
  );
};
