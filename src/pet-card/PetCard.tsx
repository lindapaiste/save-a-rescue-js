import {Avatar, Card} from 'antd';
import React from "react";
import isEmpty from "lodash/isEmpty";
import {SquareImage} from "../media/SquareImage";
import "./card-style.css";
import {DistanceCityState, distanceOrLocation, milesAway} from "../strings/distance";
import {isDefined} from "@lindapaiste/ts-helpers";
import {PetCardProps} from "./types";

const {Meta} = Card;

//TODO: "Pick Me" on hover

//TODO: banner with "3 hours ago" / "3 days ago" on recents

/**
 * want undefined to be an empty string instead of "undefined"
 */
export const string = (value: string | undefined): string => {
    return value ? value : '';
}



/**
 * needs to accept the possibility that many properties could possibly be undefined in edge cases
 *
 * moved the Link out and up in order to include "from" args
 */
export const PetCard = ({horizontal = false, id, name, breeds, coat, age, sex, image, avatar, distance, citystate, placement, ...props}: PetCardProps) => {
    return (
        <Card
            hoverable
            cover={image ? <SquareImage {...image}/> : <div/>}
            //title={name}
            className={`pet-card ${horizontal ? "horizontal" : "vertical"} ${placement}`}
            bordered={false}
        >
            <Meta
                className="pet-card-header"
                avatar={<Avatar src={avatar} size="large"/>}
                title={<span className="pet-card-name">{name}</span>}
                //description={ (!!age || !!sex) && <div className="rgtkSearchPetBasicInfo">{`${string(age)}
                // ${string(sex)}`}</div>}
            />
            <Meta
                className="pet-card-meta"
                description={<>
                    {!isEmpty(breeds) && (
                    <div className="pet-card-breed">{breeds.join(" / ")}</div>
                        )}
                    {(!!age || !!sex) && (
                        <div className="pet-card-age-sex">{`${string(age)} ${string(sex)}`.trim()}</div>
                    )}
                    {isDefined(citystate) && (
                        <div className="pet-card-location">
                            {isDefined(distance) && (
                                <div className="pet-card-distance">{milesAway(distance)}</div>
                            )}
                            {citystate}
                        </div>
                    )}
                </>}
            />
        </Card>
    )
}

//TODO: fallback avatar

/**
 * show distance if location is known, or pet city and state otherwise
 */
export const Distance = ({distance, citystate}: DistanceCityState) => {
    const string = distanceOrLocation({distance, citystate});
    return string ? (
        <div
            className="pet-card-location"
        >{string}</div>
    ) : null;
}

