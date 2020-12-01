import {Col, Row} from "antd";
import {ConnectedPetCard} from "../connected/ConnectedPetCard";
import React from "react";
import range from "lodash/range";
import {LoadingCard} from "../pet-card/LoadingCard";
import {PetLink, PropPreviousPage} from "../routing/PetLink";

export interface Props {
    animalIds: string[];
    /**
     * instead of a boolean, return the number that are loading.  This way can use in infinite scroll and generally
     * have more control
     */
    loading?: false | number;
}

// TODO: deal with jumping offset position
export const ResultsGrid = ({animalIds, loading = false, previous}: Props & PropPreviousPage) => {
    return (
        <>
            <Row gutter={[32, 32]}>
                {animalIds.map(id => (
                    <Col xs={24} sm={12} md={8} xxl={6} key={id}>
                        <PetLink
                            id={id}
                            previous={previous}
                        >
                            <ConnectedPetCard id={id}/>
                        </PetLink>
                    </Col>
                ))}
                {loading !== false && range(0, loading).map(i => (
                    <Col xs={24} sm={12} md={8} xxl={6} key={i}>
                        <LoadingCard/>
                    </Col>
                ))}
            </Row>
        </>
    );
}
