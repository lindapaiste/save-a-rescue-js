import {FilterLocation} from "../../client/request";
import React, {ComponentType, useEffect, useState} from "react";
import {UnionToAnyOf} from "@lindapaiste/ts-helpers";
import {GeoLocation, useGeoLocation} from "../../connected/useGeoLocationRedux";
import {RenderLocationSelect} from "./RenderWithButton";
import {normalizeZip} from "./ZipCodeInput";

export interface Props {
    value?: UnionToAnyOf<FilterLocation>;
    onChange?: (loc: FilterLocation) => void;
    Render?: ComponentType<RenderProps>;
}

/**
 * want to share logic for an "enter zip or use current location" component, while allowing different rendering styles
 */
export interface RenderProps extends GeoLocation {
    onClickGeo(): void;

    onFocusZip(): void;

    isGeoSelected: boolean;
    isZipSelected: boolean;
}

export const LocationSelect = ({
                                   value, onChange = () => {
    }, Render = RenderLocationSelect
                               }: Props) => {

    /**
     * whichever was more recently clicked/focused, regardless of validation
     */
    const [selected, setSelected] = useState<'zip' | 'geo'>('zip');

    /**
     * stateful value of latLon and zip accessed from hook
     * zip is now stored in redux, only after it has passed validation
     */
    const geo = useGeoLocation();
    const {loadLocation, latLon, zip} = geo;

    /**
     * updates selection and triggers location loading
     */
    const handleButtonClick = () => {
        setSelected('geo');
        loadLocation();
    }

    /**
     * just updates selection
     */
    const handleZipFocus = () => {
        setSelected('zip');
    }

    /**
     * set location when it is done loading
     * listen to changes in all three in order to always set the right location
     */
    useEffect(() => {
        // TODO: should not have to do this in multiple places
        const normalized = zip ? normalizeZip(zip) : undefined;

        if (selected === 'zip' && normalized) {
            onChange({postalcode: normalized});
        } else {
            if (latLon) {
                onChange(latLon);
            } else if (normalized) {
                onChange({postalcode: normalized});
            }
        }
    }, [latLon, selected, zip]);

    return (
            <Render
                {...geo}
                onClickGeo={handleButtonClick}
                onFocusZip={handleZipFocus}
                isGeoSelected={selected === "geo"}
                isZipSelected={selected === "zip"}
            />
    )
}

