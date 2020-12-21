import React, {useMemo, useState} from "react"
import {Organization} from "../clientRg/attributes";
import {useRequireEntity} from "../connected/useRequireEntity";
import {useEntitiesSelector} from "../redux/store";
import {getAttributes} from "../redux/rgSelectors";
import "./org-profile.css";
import {SingleOrgMap} from "../maps/SingleOrgMap";
import {useSearchResults} from "../connected/useSearchResults";
import {RenderSearchResults} from "../search-results/SearchResults";
import {DogOrCat, MaybeDogOrCat, PropSpecies} from "../strings/species";
import {Placement} from "../pet-card/types";
import {ShelterBox} from "../single-pet/ShelterBox";

/**
 * TODO: need to flag in database which addresses are shelters and which are mailing addresses only
 * some will have a street address, but it is a UPS Store
 */


export const RGOrgProfile = ({id}: { id: string }) => {

    const {isLoading, isError, error, load} = useRequireEntity({type: 'orgs', id});

    const attributes = useEntitiesSelector(getAttributes('orgs')(id));

    if (attributes) {
        return (
            <RenderRGOrgProfile {...attributes} id={id}/>
        )
    }
    return <div/>
}

/**
 * main page should show sliders with dogs and cats
 * tabs/links to view all dogs and all cats
 */

export const RenderRGOrgProfile = (props: Organization & { id: string }) => {
    const {id, street = '', city = '', state = '', name, lat, lon} = props;
    const [species, setSpecies] = useState<MaybeDogOrCat>();
    return (
        <div className="org-profile">
            <h1>{name}</h1>
            {!!lat && !!lon && (
                <div className="google-map-area org">
                    <SingleOrgMap
                        title={name}
                        address={`${street} ${city}, ${state}`}
                        lat={lat}
                        lon={lon}
                    />
                </div>
            )}
            <ShelterBox {...props}/>
            <div onClick={() => setSpecies(DogOrCat.CAT)}>Cats</div>
            <div onClick={() => setSpecies(DogOrCat.DOG)}>Dogs</div>
            <OrgAdoptables
                id={id}
                species={species}
            />
        </div>
    )
}

export const OrgAdoptables = ({id, species}: { id: string } & PropSpecies) => {

    const args = useMemo(() => ({
        org: id,
        species
    }), [id, species]);

    const results = useSearchResults(args);

    return (
        <RenderSearchResults
            {...results}
            species={species}
            placement={Placement.ORG_ADOPTABLE}
        />
    )
}
