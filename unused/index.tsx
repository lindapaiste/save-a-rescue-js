import {Photos} from "./media/ImageTrio";
import {Titles} from "./current/Titles";
import {InfoBox} from "./current/InfoBox";
import {Description} from "./current/Description";
import React from "react";

export const PetPage = () => {
    return (
        <>
            <div className="rgtkPetContainer" id="rgtkPetContainer_0" data-_style="">
                <div className="rgtkPetInfoContainer" id="rgtkPetInfoContainer_0">

                    <div className="rgtkPetBrowsePetsBox" id="rgtkPetBrowsePetsBox_0">

                    </div>

                    <hr className="rgtkClearBoth"/>

                    <Photos/>

                    <Titles/>

                    <InfoBox/>
                    <Description/>

                </div>

            </div>

            <hr className="rgtkClearBoth"/>
        </>

    )
}
