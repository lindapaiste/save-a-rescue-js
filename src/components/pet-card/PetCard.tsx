import { Avatar, Card } from "antd";
import React from "react";
import { isDefined } from "@lindapaiste/ts-helpers";
import { isEmpty } from "lodash";
import { SquareImage, SquareWrapper } from "../media/SquareImage";
import { milesAway } from "../../util/strings/distance";
import { PetCardProps } from "./types";
import { ageAndSex } from "../../util/strings/age";
import "./card-style.less";

const { Meta } = Card;

// IDEA: "Pick Me" on hover

// IDEA: banner with "3 hours ago" / "3 days ago" on recents

/**
 * needs to accept the possibility that many properties could possibly be undefined in edge cases
 *
 * moved the Link out and up in order to include "from" args
 */
export const PetCard = ({
  horizontal = false,
  name,
  breeds,
  age,
  sex,
  image,
  avatar,
  distance,
  citystate,
  placement,
  species,
}: PetCardProps) => {
  return (
    <Card
      hoverable
      cover={
        image ? (
          <SquareImage {...image} wrapperClass="pet-card-image" />
        ) : (
          <SquareWrapper className="pet-card-image placeholder" />
        )
      }
      className={`pet-card ${
        horizontal ? "horizontal" : "vertical"
      } ${placement}`}
      prefixCls="pet-card"
      bordered={false}
    >
      <Meta
        className="pet-card-header"
        avatar={<Avatar src={avatar} size="large" />}
        title={<span className="pet-card-name">{name}</span>}
      />
      <Meta
        className="pet-card-meta"
        description={
          <>
            {!isEmpty(breeds) && (
              <div className="pet-card-breed">{breeds.join(" / ")}</div>
            )}
            {(!!age || !!sex) && (
              <div className="pet-card-age-sex">
                {ageAndSex(age || "", sex || "", species).trim()}
              </div>
            )}
            {isDefined(citystate) && (
              <div className="pet-card-location">
                {isDefined(distance) && (
                  <div className="pet-card-distance">{milesAway(distance)}</div>
                )}
                {citystate}
              </div>
            )}
          </>
        }
      />
    </Card>
  );
};

// TODO: fallback avatar
