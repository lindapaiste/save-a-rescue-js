import React from "react";
import {PetLink} from "../routing/PetLink";
import {useEntitiesSelector, useSelector} from "../redux/store";
import {useRequireAnimal} from "../connected/useRequireEntity";
import {getAnimalPrimaryImage, getAttribute} from "../redux/selectors";
import {SquareImage} from "./media/SquareImage";

/**
 * takes prop ignored in order to exclude the current page
 */
export interface Props {
    ignored?: string;
    max?: number;
}

//TODO: carousel

export const RecentlyViewed = ({ignored, max = 6}: Props) => {
    const all = useSelector(state => state.recent);
    const ids = all.filter(id => id !== ignored).slice(0, max);

    if (!ids.length) {
        return null;
    }

    return (
        <div className="recently-viewed">
            <h3>Recently Viewed</h3>
            <div className="thumbs">
                {ids.map(id => (
                    <LinkedThumb
                        key={id}
                        id={id}
                    />
                ))}
            </div>
        </div>
    )
}

export const LinkedThumb = ({id}: { id: string }) => {
    const {isLoading} = useRequireAnimal(id);

    const name = useEntitiesSelector(getAttribute('animals', id, 'name')) || "";
    const image = useEntitiesSelector(getAnimalPrimaryImage(id));

    return (
        <PetLink id={id}>
            <div className="recent-pet">
                {image ? <SquareImage {...image} wrapperClass="image"/> : <div/>}
                <div className="name">{name}</div>
            </div>
        </PetLink>
    )
}
