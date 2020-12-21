import React from "react"
import { LegacyPawPrint } from "../elements/icons"
import "./app-promo.less";

/**
 * TODO: show android link if on android devices
 *
 * TODO: load in effects
 *
 * TODO: lazy load wp images
 *
 * TODO: link to app store for user's country
 *
 * TODO: there is an intermediate size around 600px wide which would look good with two columns and the logo above both
 */

export const AppPromo = () => {
    return (
        <section id="home-app-promo" className="center-contents">

                <div className="screenshot center-contents">
                    <img
                        src="https://savearescue.org/wp-content/uploads/2020/04/app.png"
                        alt="Save A Rescue Mobile App Screenshot"
                        sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 519px, 100vw"
                        data-srcset="https://savearescue.org/wp-content/uploads/2020/04/app.png 519w, https://savearescue.org/wp-content/uploads/2020/04/app-480x588.png 480w"
                        data-src="https://savearescue.org/wp-content/uploads/2020/04/app.png" loading="lazy"
                        srcSet="https://savearescue.org/wp-content/uploads/2020/04/app.png 519w, https://savearescue.org/wp-content/uploads/2020/04/app-480x588.png 480w"
                    />
                </div>
                <div className="center-contents app-promo-info">
                    <h2 className="app-logo">
                        <img
                            //className="wp-image-1991 alignnone size-medium ls-is-cached lazyloaded"
                            src="https://savearescue.org/wp-content/uploads/2020/04/app-logo.png"
                            alt="Save A Rescue Mobile App"
                            data-src="https://savearescue.org/wp-content/uploads/2020/04/app-logo.png"
                            loading="lazy"
                        />
                        <span className="hidden" aria-hidden="true">Save A Rescue App</span>
                    </h2>


                    <p className="app-text">
                        Download our Free APP for Access to All Dog &amp; Cat Adoptables &amp; Pet
                        Services in Your Community!
                    </p>


                    <LegacyPawPrint className="paw-print-icon"/>
                    <a
                        className="app-store-button"
                        href="https://apps.apple.com/us/app/savearescue/id1397136449"
                    >
                        <img
                            src="https://savearescue.org/wp-content/uploads/2020/01/app-store.png"
                            alt="Download on the Apple app store"
                            data-src="https://savearescue.org/wp-content/uploads/2020/01/app-store.png"
                            loading="lazy"
                        />
                    </a>

                </div>
        </section>
    )
}
