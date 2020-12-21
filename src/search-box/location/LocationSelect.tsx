import {FilterLocation} from "../../clientRg/request";
import React, {ComponentType, useEffect, useState} from "react";
import {UnionToAnyOf} from "@lindapaiste/ts-helpers";
import {GeoLocation, useGeoLocation} from "../../location/useGeoLocation";
import {RenderLocationSelect} from "./RenderWithButton";
import {flatActions, useSelector} from "../../redux/store";
import {latestLocation} from "../../redux/location";
import {isLatLon, isZip, normalizeZip} from "../../location/validation";
import {LatLon, ValidUserLocation} from "../../location/types";
import {useDispatch} from "react-redux";
import {useUserLocation} from "../../location/useUserLocation";

export interface Props {
    value?: UnionToAnyOf<ValidUserLocation>;
    onChange?: (loc: ValidUserLocation) => void;
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
    zip?: string;
    setZip: (zip: string) => void;
}

export const LocationSelect = ({value, onChange = () => {
    }, Render = RenderLocationSelect}: Props) => {

    /**
     * whichever was more recently clicked/focused, regardless of validation
     */
    const [selected, setSelected] = useState<'zip' | 'geo'>('zip');

    /**
     * stateful value of latLon and zip accessed from hook
     * zip is now stored in redux, only after it has passed validation
     */
    const geo = useGeoLocation();
    const {loadLocation} = geo;
    const zip = useSelector(state => latestLocation(state.location, isZip))?.zip;
    const latLon = useSelector(state => latestLocation<LatLon>(state.location, isLatLon));

    /**
     * need to trigger ip fetching
     */
    const latest = useUserLocation();
    console.log(zip);

    const dispatch = useDispatch();
    const setZip = (zip: string) => dispatch(flatActions.enterZip({timestamp: Date.now(), zip, source: 'input'}));

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
            onChange({zip: normalized});
        } else {
            if (latLon) {
                onChange(latLon);
            } else if (normalized) {
                onChange({zip: normalized});
            }
        }
    }, [latLon, selected, zip]);

    return (
            <Render
                {...geo}
                zip={zip}
                setZip={setZip}
                onClickGeo={handleButtonClick}
                onFocusZip={handleZipFocus}
                isGeoSelected={selected === "geo"}
                isZipSelected={selected === "zip"}
            />
    )
}

