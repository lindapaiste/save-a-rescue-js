import {SrcSet} from "../single-pet/media/SrcSetImage";
import {Avatar, Card} from 'antd';
import React from "react";
import isEmpty from "lodash/isEmpty";
import {SquareImage} from "../single-pet/media/SquareImage";
import {MaybeDogOrCat} from "../strings/species";
import "./card-style.css";
import {DistanceCityState, distanceOrLocation, milesAway} from "../strings/distance";
import {isDefined} from "@lindapaiste/ts-helpers";

const {Meta} = Card;

/**
 * at this point I am mostly trying to figure out what props are needed here
 *
 * Ant Design has a nice loading card
 */

export interface Props {
    id: string;
    name: string;
    breeds: string[];
    coat?: string;
    age?: string;
    sex?: string;
    distance?: number;
    citystate?: string;
    image?: SrcSet;
    avatar?: string;
    species?: MaybeDogOrCat; //TODO: use for age and fallback image
}

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
export const PetCard = ({id, name, breeds, coat, age, sex, image, avatar, distance, citystate, ...props}: Props) => {
    return (
        <Card
            hoverable
            cover={image ? <SquareImage {...image}/> : <div/>}
            //title={name}
            className="pet-card"
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
                        <div className="pet-card-age-sex">{`${string(age)} ${string(sex)}`}</div>
                    )}
                    {isDefined(citystate) && (
                        <div className="pet-card-location">{citystate}</div>
                    )}
                    {isDefined(distance) && (
                        <div className="pet-card-distance">{milesAway(distance)}</div>
                    )}
                </>}
            />
        </Card>
    )
}

//TODO: fallback avatar

//TODO: enforce consistent casing on city, state

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

