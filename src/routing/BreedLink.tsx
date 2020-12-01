import React from "react";
import {Link} from "react-router-dom";
import {useEntitiesSelector} from "../redux/store";
import {getAttribute} from "../redux/selectors";

//TODO: actual link
export const BreedLink = ({id}: {id: string}) => {
    const name = useEntitiesSelector(getAttribute('breeds', id, 'name'));

    return (
        <span>{name}</span>
    )
}
