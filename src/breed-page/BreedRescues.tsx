import {useBreedRescues} from "../orgsandrescues/useBreedRescues";
import {Loading} from "../loading/Loading";
import React, {useState} from "react";
import {FetchError} from "../loading/FetchError";
import {BreedParams} from "../routing/useBreedTab";
import {useParams} from "react-router-dom";
import {RescueListItem} from "../orgsandrescues/RescueListItem";
import {RescuesMap} from "../maps/ResultsMap";

//TODO: map scroll with list

export const BreedRescues = () => {

    const [hoveredId, setHoveredId] = useState<number>();

    console.log({hoveredId});

    const {slug = ''} = useParams<BreedParams>();
    const {isLoading, isError, error, rescues = []} = useBreedRescues(slug);

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (isError) {
        //TODO: reload
        return (
            <FetchError error={error} load={console.log}/>
        )
    } else return (
        <div className="breed-rescues">
            <div className="rescues-list">
                {rescues.map(rescue => (
                    <div key={rescue.id}
                         onMouseEnter={() => setHoveredId(rescue.id)}
                         onMouseLeave={() => setHoveredId(undefined)}
                    >
                        <RescueListItem {...rescue}/>
                    </div>
                ))}
            </div>
            <RescuesMap rescues={rescues} hoveredId={hoveredId}/>
        </div>
    )
}
