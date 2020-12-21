import {SearchBoxSchema} from "./types";
import {RescuesSelect, ServicesSelect} from "./Select";
import React from "react";
import {RenderBanner} from "./Banner";
import {RenderTabs} from "./Tabs";

export const SEARCH_BOXES: SearchBoxSchema[] = [{
    label: "Dogs",
    icon: "",
    slug: "dogs",
    title: "Search For Dogs",
    action: "https://savearescue.org/adoptable-dogs-cats/",
    image: {
        src: "https://savearescue.org/wp-content/uploads/2020/11/dog-search-inner.jpg",
        width: 112,
        height: 66,
    },
}, {
    label: "Cats",
    icon: "",
    slug: "cats",
    title: "Search For Cats",
    action: "https://savearescue.org/adoptable-dogs-cats/",
    image: {
        src: "https://savearescue.org/wp-content/uploads/2020/11/cat-search-inner.jpg",
        width: 100,
        height: 71,
    },
}, {
    label: "Rescues/Shelters",
    icon: "",
    slug: "rescues",
    title: "Discover All Rescues/Shelters",
    action: "https://savearescue.org/orgsandrescues",
    select: <RescuesSelect/>,
}, {
    label: "Pet Services",
    icon: "",
    slug: "services",
    title: <>Browse All<br/>Pet Services</>,
    action: "https://savearescue.org/pet-services-directory",
    select: <ServicesSelect/>
}]

export const Banner = () => <RenderBanner searches={SEARCH_BOXES}/>

export const Tabs = () => <RenderTabs searches={SEARCH_BOXES}/>
