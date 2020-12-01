import {useGeoLocation} from "../connected/useGeoLocationRedux";
import {useSearchResults} from "../connected/useSearchResults";
import {useRequireEntity} from "../connected/useRequireEntity";
import {useEntitiesSelector} from "../redux/store";
import {getAttribute, getRelatedIds} from "../redux/selectors";
import {MaybeDogOrCat, normalizeSpecies, speciesLabel} from "../strings/species";
import React, {useMemo} from "react";
import {RenderSearchResults} from "./SearchResults";
import { BreedLocationBox } from "../search-box/breed-location/BreedLocation";


export const BreedResultsFromId = ({id}: { id: string }) => {
    useRequireEntity({type: 'breeds', id});

    const speciesRaw = useEntitiesSelector(getRelatedIds('breeds', id, 'species'))[0];

    const species = normalizeSpecies(speciesRaw)

    const name = useEntitiesSelector(getAttribute('breeds', id, 'name')) || "";

    return (
        <BreedResults
            id={id}
            species={species}
            name={name}
        />
    )
}


/**
 * breed search should have big prompt for location, collapsed extra filters
 *
 * checkbox for purebred only
 */

export const BreedResults = ({id, name, species}: { id: string; name: string; species: MaybeDogOrCat }) => {
    const {latLon, zip} = useGeoLocation();

    const hasLocation = !!latLon || !!zip;

    const args = useMemo(
        () => {
            const location = latLon ? latLon : zip ? {postalcode: zip} : undefined;
            return {
                breed: [{
                    label: name,
                    value: id,
                }],
                location,
            }
        }
        , [id, name, latLon, zip]);

    const results = useSearchResults(args);

    return (
        <>
            {hasLocation ||
            <BreedLocationBox
                species={species}
            />
            }
            <RenderSearchResults
                {...results}
                species={species}
            />
        </>
    )
}
