import React from "react"
import {ChevronHoverButton} from "../elements/chevron-button/ChevronHoverButton";
import {LabelAndValue} from "../util/LabelAndValue";
import "./list-your-services.less"
import {PetServicesSlider} from "./pet-services-slider/Slider";
/**
 * TODO: responsive size background image
 */
export const ListYourServices = () => {
    return (
        <section id="home-list-services">

            <div className="directory center-contents">
            <h2 className="services">Pet Services Listings</h2>
            <h4 className="sub">Your "All-In-One" Search Directory</h4>

            <PetServicesSlider/>

            </div>

            <div className="cta center-contents">
            <h3 className="cta-text">
                List Your Rescue, Shelter or Pet Services here ~ Free!
            </h3>
            <div className="counts-row">
                <a href="https://savearescue.org/orgsandrescues/listing">
                <ChevronHoverButton>
                    <LabelAndValue
                        label="Rescues & Animal Shelters"
                        value="22,000+"
                    />
                </ChevronHoverButton>
                </a>
                <a href="https://savearescue.org/pet-services-directory/">
                <ChevronHoverButton>
                    <LabelAndValue
                        label="Pet Service Listings"
                        value="125,000+"
                    />
                </ChevronHoverButton>
                </a>
            </div>

            <div className="register-button">
                <a href="https://savearescue.org/add-a-directory-listing/">
                    <ChevronHoverButton>
                        Register Now
                    </ChevronHoverButton>
                </a>
            </div>
            </div>
        </section>
    )
}
