import React, {PropsWithChildren} from "react";
import Slider, {Settings} from "@ant-design/react-slick";
import {LeftOutlined, RightOutlined} from "../../elements/icons";
import "slick-carousel/slick/slick.css";
import "../../elements/slider/slick-modified.less"


/**
 * wrapper around the slick slider component handles loading the CSS files, setting the arrow components, and adding
 * extra margin to account for the arrow size
 */
export const MySlider = ({children, ...settings}: PropsWithChildren<Settings>) => {
    return (
        <div className={`slider-content-wrapper ${settings.arrows ? "arrows" : ""}`}>
            <Slider
                prevArrow={<LeftOutlined/>}
                nextArrow={<RightOutlined/>}
                {...settings}
            >
                {children}
            </Slider>
        </div>
    )
}
