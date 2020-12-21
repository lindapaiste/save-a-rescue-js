import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {useGeoLocation} from "../location/useGeoLocation";
import {RescueOrg} from "../orgsandrescues/types";
import {RescueMarker} from "./RescueMarker";
import {fillLonLng} from "../location/validation";

export const RescuesMap = ({rescues, hoveredId}: { hoveredId?: number; rescues: (RescueOrg & { distance?: number })[] }) => {

    const {latLon} = useGeoLocation();

    const [hoveredMarker, setHoveredMarker] = useState<RescueOrg>();

    const center = {lat: 29.7738, lng: -95.406}
    const zoom = 11;

    console.log(process.env.GOOGLE_MAPS_API_KEY, process.env);
    //const key = process.env.GOOGLE_MAPS_API_KEY || '';
    const key = "AIzaSyDMYCFBCILwWHE8S-auMsMqslf8_si_7ww";

    return (
        // Important! Always set the container height explicitly
        <div className="google-map-area">
            <GoogleMapReact
                bootstrapURLKeys={{key}}
                //defaultCenter={center}
                center={latLon ? fillLonLng(latLon) : undefined}
                defaultZoom={9}
            >
                {rescues.map(rescue => (
                    <RescueMarker
                        key={rescue.id}
                        lat={rescue.location.lat}
                        lng={rescue.location.lng}
                        isHovered={rescue.id === hoveredId}
                        isActive={hoveredMarker?.id === rescue.id}
                        rescue={{
                            ...rescue,
                            ...rescue.location
                        }}
                        onMouseEnter={() => setHoveredMarker(rescue)}
                        onMouseLeave={() => setHoveredMarker(undefined)}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
}
