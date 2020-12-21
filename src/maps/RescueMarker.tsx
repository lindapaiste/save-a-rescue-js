import {HoverProps as HoverProps, RescueMapHover} from "./RescueMapHover";
import React from "react";
import EnvironmentFilled from "@ant-design/icons/EnvironmentFilled";
import {LatLng} from "../location/types";

export interface MarkerProps {
    rescue: HoverProps;
    isHovered?: boolean;
    isActive?: boolean;
}

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type Props = LatLng & MarkerProps & DivProps;

export const RescueMarker = ({lat, lng, rescue, isHovered, isActive, ...props}: LatLng & MarkerProps & DivProps) => (
    <div
        {...props}
    >
        <EnvironmentFilled
            className={`map-marker ${isHovered ? "active" : "inactive"}`}
            color={isHovered ? "blue" : undefined}
        />
        {isActive && <RescueMapHover {...rescue} />}
    </div>
);
