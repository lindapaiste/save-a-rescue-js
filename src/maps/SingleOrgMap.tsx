import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import EnvironmentFilled from "@ant-design/icons/EnvironmentFilled";
import {RescueMarker} from "./RescueMarker";
import {HoverProps} from "./RescueMapHover";
import {LatLng, LatLon} from "../location/types";

/**
 * show one map centered on the rescue
 * doesn't need much interaction
 * show user's dot?
 * what about google Places info?  street view?
 *
 * show address either on hover or on click
 *
 * TODO: get directions - user types address in form field and hits button to get directions
 *
 * Directions Service: This API project is not authorized to use this API.  For more information on authentication and
 * Google Maps JavaScript API services please see:
 * https://developers.google.com/maps/documentation/javascript/get-api-key
 *
 *  code: "REQUEST_DENIED"
 *  endpoint: "DIRECTIONS_ROUTE"
 *  message: "DIRECTIONS_ROUTE: REQUEST_DENIED: There was an issue performing a Directions request."
 *  name: "MapsRequestError"
 */

const Marker = (props: LatLng) => (
    <EnvironmentFilled
        className={`map-marker rescue`}
    />
)

export interface Props extends LatLon, HoverProps {

}

export const SingleOrgMap = ({lat, lon, ...props}: Props) => {

    const [isActive, setIsActive] = useState(false);

    console.log(process.env.GOOGLE_MAPS_API_KEY, process.env);
    //const key = process.env.GOOGLE_MAPS_API_KEY || '';
    const key = "AIzaSyDMYCFBCILwWHE8S-auMsMqslf8_si_7ww";

    return (
        <GoogleMapReact
            bootstrapURLKeys={{key}}
            defaultCenter={{lat, lng: lon}}
            defaultZoom={9}
        >
            <RescueMarker
                rescue={props}
                isActive={isActive}
                lat={lat}
                lng={lon}
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
            />
        </GoogleMapReact>
    );
}
