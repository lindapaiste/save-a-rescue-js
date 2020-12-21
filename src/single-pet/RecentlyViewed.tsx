import React from "react";
import {useEntitiesSelector, useSelector} from "../redux/store";
import {useRequireAnimal} from "../connected/useRequireEntity";
import {getAnimalPrimaryImage, getAttribute} from "../redux/rgSelectors";
import {SquareImage} from "../media/SquareImage";
import {petProfile} from "../routing/paths";
import {Link} from "react-router-dom";

/**
 * takes prop ignored in order to exclude the current page
 */
export interface Props {
    ignored?: string;
    max?: number;
}

//TODO: carousel
//TODO: persist via local storage

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
        <Link to={petProfile(id)} className={"recent-pet"}>
            {image ? <SquareImage {...image} wrapperClass="image"/> : <div/>}
            <span className="name">{name}</span>
        </Link>
    )
}
