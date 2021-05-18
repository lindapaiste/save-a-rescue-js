import { isDefined } from "@lindapaiste/ts-helpers";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import React from "react";
import { Animal } from "../../services/rescuegroups-api/schema/attributes";
import { PropSpecies } from "../../services/species/species";
import { IconAndText } from "../../util/IconAndText";
import { ageLabel, structuredAge } from "../../util/strings/age";

/**
 * separate the number from the months/years label for better styling
 * not sure if age string is ever present when birth date is not
 * fallback to age group
 */
const AgeInner = ({
  birthDate,
  ageString,
  ageGroup,
  species,
}: Partial<Animal> & PropSpecies) => {
  if (birthDate) {
    const { number, label } = structuredAge(birthDate);
    return (
      <>
        <span className="age-number">{number}</span>{" "}
        <span className="age-label">{label}</span>
      </>
    );
  }
  if (ageString) {
    return ageString;
  }
  if (ageGroup) {
    return ageLabel(ageGroup, species);
  }
  return null;
};
/**
 * separate by bullet -- but only if both are present!
 * show months if < 1 year old, years if > 1
 * not sure if age string is ever present when birth date is not
 */
export const AgeSex = ({ sex, ...props }: Partial<Animal> & PropSpecies) => {
  // get the JSX first to check if it's null
  const age = AgeInner(props);
  const hasBoth = !!sex && !!age;
  return (
    <div className="sex-age">
      {isDefined(sex) && (
        <span className="sex">
          <IconAndText
            icon={sex === "Male" ? <ManOutlined /> : <WomanOutlined />}
            text={sex}
          />
        </span>
      )}
      {hasBoth && <span className="separator"> • </span>}
      {!!age && <span className="age">{age}</span>}
    </div>
  );
};
