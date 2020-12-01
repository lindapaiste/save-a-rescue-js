import {useEntitiesSelector} from "../redux/store";
import {getAllAttributes} from "../redux/selectors";
import React from "react";
import {IfTruthy} from "../util/IfDefined";

export const AdoptionBox = ({id, orgId}: { id: string, orgId: string }) => {

    const {isCommonapplicationAccepted, adoptionProcess} = useEntitiesSelector(getAllAttributes('orgs')(orgId))

    return (
        <div className="adoption-box">
            <IfTruthy value={isCommonapplicationAccepted}>
                <span>Common Application Accepted</span>
            </IfTruthy>
            <IfTruthy value={adoptionProcess}>
            </IfTruthy>
        </div>
    )
}
