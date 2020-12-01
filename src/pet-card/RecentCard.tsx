import {Card} from "antd";
import {SquareImage} from "../single-pet/media/SquareImage";
import React from "react";
import {SrcSet} from "../single-pet/media/SrcSetImage";
import {MaybeDogOrCat} from "../strings/species";

export interface Props {
    id: string;
    name: string;
    image?: SrcSet;
    species?: MaybeDogOrCat;
}

export const RecentCard = ({id, name, image}: Props) => {
    return (
        <Card
            hoverable
            cover={image ? <SquareImage {...image}/> : <div/>}
            title={name}
            className="pet-card recent"
            bordered={false}
        />
    )
}
