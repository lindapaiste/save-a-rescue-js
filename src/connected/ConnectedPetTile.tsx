import {useEntitiesSelector} from "../redux/store";
import {getAnimalPrimaryImage} from "../redux/rgSelectors";
import {Loading} from "../loading/Loading";
import React from "react";
import {SquareImage} from "../media/SquareImage";
import {PetLink} from "../routing/PetLink";

export const LoadingPetTile = () => (
    <div className="pet-tile">
        <Loading size={50}/>
    </div>
)

export const ConnectedPetTile = ({id}: { id: string }) => {

    const image = useEntitiesSelector(getAnimalPrimaryImage(id));

    if (!image) {
        return <LoadingPetTile/>;
    }
    return (
        <PetLink id={id}>
            <div className="pet-tile">
                <SquareImage {...image}/>
            </div>
        </PetLink>
    )
}
