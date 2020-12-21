import {Tile} from "./Tile";
import data from "./data.json"

import Slider, {Settings} from "@ant-design/react-slick";

import "slick-carousel/slick/slick.css";

import "../../elements/slider/slick-modified.less"
import {LeftOutlined, RightOutlined} from "../../elements/icons";
import React from "react";
import {MySlider} from "../../elements/slider/MySlider";



const settings: Settings = {
    accessibility: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    infinite: true,
    speed: 600,
    pauseOnHover: true,
    slidesToShow: 4,
    //prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left"/></div>',
    //nextArrow: '<div class="slick-next"><i class="fa fa-angle-right"/></div>',
    lazyLoad: 'ondemand',
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
}


export const PetServicesSlider = () => {
    return (
        <MySlider {...settings}>
            {data.map(obj => (
                <Tile {...obj}/>
            ))}
        </MySlider>
    )
}
