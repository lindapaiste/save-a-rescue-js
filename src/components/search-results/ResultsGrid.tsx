import { Col, Row } from "antd";
import React from "react";
import { range } from "lodash";
import { ConnectedPetCard } from "../pet-card/ConnectedPetCard";
import { LoadingCard } from "../pet-card/LoadingCard";
import { ConnectedPetTile, LoadingPetTile } from "../pet-card/ConnectedPetTile";
import { ResultsFormat } from "./FormatSwitch";
import { Placement } from "../pet-card/types";

export interface Props {
  animalIds: string[];
  /**
   * Instead of a boolean, return the number that are loading.  This way can use in infinite scroll and generally
   * have more control
   */
  loading?: false | number;
  format?: ResultsFormat;
  placement: Placement;
}

const getBreakpoints = (format: ResultsFormat, placement: Placement) => {
  if (format === "list") {
    return {
      xs: 24,
    };
  }
  if (placement === Placement.HOME_PAGE) {
    return {
      xs: 6,
    };
  }
  return {
    xs: 24,
    sm: 12,
    md: 8,
    xxl: 6,
  };
};

// TODO: deal with jumping offset position
export const ResultsGrid = ({
  animalIds,
  loading = false,
  format = "card",
  placement,
}: Props) => {
  const breakpoints = getBreakpoints(format, placement);
  return (
    <>
      <Row gutter={[32, 32]} className="search-grid">
        {animalIds.map((id) => (
          <Col {...breakpoints} key={id}>
            <ConnectedPetCard
              id={id}
              horizontal={format === "list"}
              placement={placement}
            />
          </Col>
        ))}
        {loading !== false &&
          range(0, loading).map((i) => (
            <Col {...breakpoints} key={i}>
              <LoadingCard />
            </Col>
          ))}
      </Row>
    </>
  );
};

export const ResultsPhotos = ({ animalIds, loading = false }: Props) => {
  return (
    <>
      <Row gutter={[4, 4]}>
        {animalIds.map((id) => (
          <Col span={8} xxl={6} key={id}>
            <ConnectedPetTile id={id} />
          </Col>
        ))}
        {loading !== false &&
          range(0, loading).map((i) => (
            <Col span={8} xxl={6} key={i}>
              <LoadingPetTile />
            </Col>
          ))}
      </Row>
    </>
  );
};
