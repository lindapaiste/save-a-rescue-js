import {Col, Row} from "antd";
import {ConnectedPetCard} from "../connected/ConnectedPetCard";
import React from "react";
import range from "lodash/range";
import {LoadingCard} from "../pet-card/LoadingCard";
import {ConnectedPetTile, LoadingPetTile} from "../connected/ConnectedPetTile";
import {ResultsFormat} from "./FormatSwitch";
import {Placement} from "../pet-card/types";

export interface Props {
    animalIds: string[];
    /**
     * instead of a boolean, return the number that are loading.  This way can use in infinite scroll and generally
     * have more control
     */
    loading?: false | number;
    format?: ResultsFormat;
    placement: Placement;
}

// TODO: deal with jumping offset position
export const ResultsGrid = ({animalIds, loading = false, format = "card", placement}: Props) => {
    const breakpoints = format === "list" ? {
        xs: 24
    } : placement === Placement.HOME_PAGE ? {
        xs: 6,
    } : {
        xs: 24,
        sm: 12,
        md: 8,
        xxl: 6
    }

    return (
        <>
            <Row gutter={[32, 32]} className="search-grid">
                {animalIds.map(id => (
                    <Col {...breakpoints} key={id}>
                        <ConnectedPetCard
                            id={id}
                            horizontal={format === "list"}
                            placement={placement}
                        />
                    </Col>
                ))}
                {loading !== false && range(0, loading).map(i => (
                    <Col {...breakpoints} key={i}>
                        <LoadingCard/>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export const ResultsPhotos = ({animalIds, loading = false}: Props) => {
    return (
        <>
            <Row gutter={[4, 4]}>
                {animalIds.map(id => (
                    <Col span={8} xxl={6} key={id}>
                        <ConnectedPetTile id={id}/>
                    </Col>
                ))}
                {loading !== false && range(0, loading).map(i => (
                    <Col span={8} xxl={6} key={i}>
                        <LoadingPetTile/>
                    </Col>
                ))}
            </Row>
        </>
    );
}
