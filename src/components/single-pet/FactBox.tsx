import React, { ReactNode } from "react";
import { Col, Row } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { isDefined } from "@lindapaiste/ts-helpers";
import { Animal } from "../../services/rescuegroups-api/schema/attributes";
import {
  activityLevelValues,
  energyLevelValues,
  FenceNeeds,
  newPeopleReactionValues,
  obedienceTrainingValues,
  vocalLevelValues,
} from "../../services/rescuegroups-api/schema/enums";
import { EnumBar } from "./FactBar";
import "./fact-box.less";
import { PropSpecies, speciesLabel } from "../../services/species/species";
import { BooleanBullet, Bullet } from "./Bullet";

/**
 * For each fact, want to skip over if not set
 * Want to not even include the heading if there isn't any content
 */
export interface SectionProps {
  slug: string;
  title: string | ReactNode;
}

/**
 * Cannot use children because children prop is special -- always an array of react element objects, even if the
 * element renders null.  For the same reason, must call function components as functions rather than with JSX.
 */
export const ConditionalFactsSection = ({
  slug,
  title,
  facts,
}: SectionProps & { facts: ReactNode[] }) => {
  const filtered = facts.filter((f) => !!f);

  if (filtered.length < 1) {
    return null;
  }
  return (
    <div className={`facts-section ${slug}`}>
      <h3>{title}</h3>
      <Row>
        {filtered.map(
          (
            node,
            i // TODO get key from node, but have to TS check
          ) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={i} xs={12} sm={8} md={24} lg={12}>
              {node}
            </Col>
          )
        )}
      </Row>
    </div>
  );
};

export const Personality = ({
  activityLevel,
  energyLevel,
  vocalLevel,
  obedienceTraining,
  newPeopleReaction,
}: Partial<Animal>) => {
  return (
    <ConditionalFactsSection
      title="My Personality"
      slug="personality"
      facts={[
        EnumBar({
          title: "Activity Level",
          value: activityLevel,
          ordered: activityLevelValues,
        }),
        EnumBar({
          title: "Energy Level",
          value: energyLevel,
          ordered: energyLevelValues,
        }),
        EnumBar({
          title: "Vocal Level",
          value: vocalLevel,
          ordered: vocalLevelValues,
        }),
        EnumBar({
          title: "Obedience",
          value: obedienceTraining,
          ordered: obedienceTrainingValues,
        }),
        EnumBar({
          title: "Likes Strangers",
          value: newPeopleReaction,
          ordered: newPeopleReactionValues,
        }),
      ]}
    />
  );
};

const fenceString = (value: FenceNeeds): string => {
  switch (value) {
    case "3 foot":
      return "3-Foot Fence";
    case "6 foot":
      return "6-Foot Fence";
    case "Not required":
      return "No Fence Needed";
    case "Any type":
    default:
      return "Fence Required";
  }
};

export const Health = ({
  isSpecialNeeds,
  isAltered,
  sex,
  isDeclawed,
  isMicrochipped,
  isCurrentVaccinations,
}: Partial<Animal>) => {
  return (
    <ConditionalFactsSection
      slug="health"
      title="My Health"
      facts={[
        BooleanBullet({
          value: isSpecialNeeds,
          ifTrue: "Special Needs",
        }),
        BooleanBullet({
          value: isAltered,
          ifTrue:
            // eslint-disable-next-line no-nested-ternary
            sex === "Female" ? "Spayed" : sex === "Male" ? "Neutered" : "Fixed",
        }),
        BooleanBullet({
          value: isDeclawed,
          ifTrue: "Declawed",
        }),
        BooleanBullet({
          value: isMicrochipped,
          ifTrue: "Microchipped",
        }),
        BooleanBullet({
          value: isCurrentVaccinations,
          ifTrue: "Vaccinations up-to-date",
        }),
      ]}
    />
  );
};

/**
 * doing it this way in order to group yes and nos together
 */
const GoodWith = ({
  adultSexesOk,
  isDogsOk,
  isKidsOk,
  isSeniorsOk,
  isCatsOk,
  isFarmAnimalsOk,
}: Partial<Animal>): ReactNode[] => {
  const yes: string[] = [];
  const no: string[] = [];

  const helper = (value: boolean | undefined, string: string) => {
    if (value === true) {
      yes.push(string);
    } else if (value === false) {
      no.push(string);
    }
  };
  if (adultSexesOk === "Women Only") {
    no.push("Men");
  } else if (adultSexesOk === "Men Only") {
    no.push("Women");
  }

  helper(isKidsOk, "Kids");
  helper(isSeniorsOk, "Seniors");
  helper(isCatsOk, "Cats");
  helper(isDogsOk, "Dogs");
  helper(isFarmAnimalsOk, "Farm Animals");

  return [
    ...yes.map((str) => <Bullet key={str} title={`${str} OK`} />),
    ...no.map((str) => (
      <Bullet key={str} title={`No ${str}`} icon={<CloseCircleOutlined />} />
    )),
  ];
};

export const IdealHome = ({
  ownerExperience,
  species,
  indoorOutdoor,
  isYardRequired,
  fenceNeeds,
  ...props
}: Partial<Animal> & PropSpecies) => {
  return (
    <ConditionalFactsSection
      slug="ideal-home"
      title="My Ideal Home"
      facts={[
        ownerExperience === "Species" && (
          <Bullet
            title={`Experienced ${speciesLabel(species, "singular")} Owner`}
          />
        ),
        ownerExperience === "Breed" && (
          <Bullet title="Owner with Breed Experience" />
        ),
        isDefined(indoorOutdoor) && <Bullet title={indoorOutdoor} />,
        isDefined(isYardRequired) && (
          <Bullet
            title={isYardRequired ? "Yard Required" : "Yard Not Required"}
          />
        ),
        isDefined(fenceNeeds) && (
          <Bullet title={fenceString(fenceNeeds as FenceNeeds)} />
        ),
        ...GoodWith(props),
      ]}
    />
  );
};
