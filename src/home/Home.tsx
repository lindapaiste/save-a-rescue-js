import React from "react";
import {SpeciesLatest} from "./SpeciesLatest";
import {DogOrCat} from "../strings/species";
import "./home.less";
import {AppPromo} from "./AppPromo";
import {ListYourServices} from "./ListYourServices";
import {BlinkBoxes} from "./BlinkBoxes";
import {PetServicesSlider} from "./pet-services-slider/Slider";
import {Banner, Tabs} from "./search-bubbles";
import {PartnersSlider} from "./partners-slider/PartnersSlider";
import {HomePosts} from "./recent-posts/HomePosts";

export const Home = () => {
    return (
        <div>
            <Banner/>
            <BlinkBoxes/>
            <section id="home-adoptables">
                <SpeciesLatest species={DogOrCat.DOG}/>
                <SpeciesLatest species={DogOrCat.CAT}/>
            </section>
            <ListYourServices/>
            <HomePosts/>
            <AppPromo/>
            <PartnersSlider/>
        </div>
    )
}
/*
            <section id="home-pet-services">
            <PetServicesSlider/>
            </section>
 */
