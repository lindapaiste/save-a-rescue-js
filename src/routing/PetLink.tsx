import React, {PropsWithChildren, ReactNode} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {AppPage, petProfile} from "./paths";

export interface PropPreviousPage {
    previous?: AppPage;
}

export type Props = PropsWithChildren<PropPreviousPage> & {id: string}

export const PetLink = ({children, previous, id}: Props) => {
    return (
        <Link
            to={{
                pathname: petProfile(id),
                state: {
                    previous
                }
            }}
        >
            {children}
        </Link>
    )
}

export const usePreviousPage = (): AppPage | undefined => {
    const {state} = useLocation<PropPreviousPage | undefined>();
    return state?.previous;
}
