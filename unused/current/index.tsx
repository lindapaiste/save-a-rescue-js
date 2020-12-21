import React from "react";
import {Photos} from "./Photos";
import {InfoBox} from "./InfoBox";
import {Titles} from "./Titles";
import {Description} from "./Description";
import "./remote-styles.css";
import "./theme-pet-styles.css";
import "./my-styles.css";

const pet = {
    name: "Chevy",
};


export const Current = () => {
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

//look into div nesting -- removed a whole bunch of end tags from bottom


/**
 * scripts
 * <script src="https://savearescue.org/wp-content/themes/Divi-Child-Theme/js/grid1_layout.js?ver=1"
 * type="text/javascript"></script><script src="https://toolkit.rescuegroups.org/j/3/pet1_layout.js"
 * type="text/javascript"></script>
 */
