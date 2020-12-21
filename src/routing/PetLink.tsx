import React, {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {petProfile} from "./paths";

export type Props = PropsWithChildren<{ id: string }> & React.RefAttributes<HTMLAnchorElement>

export const PetLink = ({id, ...props}: Props) => {
    return (
        <Link
            {...props}
            to={petProfile(id)}
            className={"pet-profile-link"}
        />
    )
}
