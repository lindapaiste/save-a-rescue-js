import React from "react";
import {WpCarouselSlider} from "./SpWpSlider";
import "./partners-style.less";
import {LegacyPawPrint} from "../../elements/icons";

const PARTNERS_SLIDER_ID = 22900;

//TODO: src with matching aspect ratio only
//TODO: how to show caption?

export const PartnersSlider = () => {
    return (
        <section id="partners-slider" className="center-contents">
            <h2>Our Partnered Rescues</h2>
            <h5>We Are Partners With And Supported By The Following Terrific Organizations</h5>
            <LegacyPawPrint/>
            <WpCarouselSlider id={PARTNERS_SLIDER_ID}/>
        </section>
    )
}
