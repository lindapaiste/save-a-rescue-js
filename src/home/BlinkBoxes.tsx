import React from "react"
import "./blink-boxes.less";

export const BlinkBoxes = () => {
    return (
        <div id="home-blink-boxes">

            <div className="blink-box">
                <span>
                    <span className="blinking">8517</span> Pets<br/>
                    Saved As of Today
                </span>
            </div>

            <a className="blink-box" href="https://savearescue.org/breed-profiles/">
                <span>Adoptable Pure Breeds <span style={{display: "inline-block"}}>A-Z</span></span>
            </a>

            <a className="blink-box" href="https://savearescue.org/donation/">
                Donate
            </a>

        </div>
    )
}
