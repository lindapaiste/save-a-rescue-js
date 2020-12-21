import React from "react"
import {Bubble} from "./Bubble";
import {SearchForm} from "./Seach-Form";
import "./style.less";
import {useWindowWidth} from "@react-hook/window-size";
import {SearchBoxSchema} from "./types";
import {RenderTabs} from "./Tabs";

export const RenderBanner = ({searches}: { searches: SearchBoxSchema[] }) => {

    const width = useWindowWidth();

    return (
        <div id="home-bubbles">

            <img
                src="https://savearescue.org/wp-content/uploads/2020/11/girl-with-shiba.png"
                alt="woman with shiba dog"
                className="shiba"
            />

            <div className="bubbles-area">

                <div className="background-bubbles">
                    <Bubble top={22} left={50} size={7} color="orange"/>
                    <Bubble top={90} left={75} size={6} color="cream"/>
                    <Bubble top={34} left={63} size={5} color="cream"/>
                    <Bubble top={89} left={75} size={3} color="pink"/>
                    <Bubble top={20} left={15} size={8} color="yellow"/>
                    <Bubble top={50} left={90} size={8} color="white"/>
                    <Bubble top={75} left={39} size={7} color="yellow"/>
                    <Bubble top={74} left={38} size={4} color="cream"/>
                    <Bubble top={80} left={36} size={1} color="yellow"/>
                    <Bubble top={20} left={15} size={1} color="white"/>
                    <Bubble top={23} left={12} size={3} color="cream"/>
                    <Bubble top={30} left={12} size={5} color="orange"/>
                    <Bubble top={85} left={25} size={10} color="pink"/>
                    <Bubble top={32} left={72} size={10} color="cream" lighter/>
                    <Bubble top={62} left={47} size={6} color="cream" lighter/>
                </div>

                <div className="feature-text">
                    <h2 className="primary">Serving &amp; Supporting 22,000+ Dog &amp; Cat Rescues</h2>
                    <h4 className="secondary">A Non-Profit Organization</h4>
                </div>

                <div className="search">
                    {width >= 768
                        ?
                        searches.map(props => (
                            <SearchForm
                                key={props.slug}
                                {...props}
                                isBubble={true}
                            />
                        ))
                        :
                        <RenderTabs searches={searches}/>
                    }
                </div>

            </div>
        </div>
    )
}
