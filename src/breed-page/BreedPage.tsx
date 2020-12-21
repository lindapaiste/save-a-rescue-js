import {BlockData, BreedData} from "./types";
import {ProsAndCons} from "./ProsAndCons";
import {HistoryTimeline} from "./Timeline";
import {RatingsBox} from "./RatingsBox";
import {BasicInfo} from "./BasicInfo";
import React, {ReactNode} from "react";
import {Tabs} from "antd";
import {BarsOutlined, CalendarOutlined, CommentOutlined, EnvironmentOutlined, HomeOutlined} from "@ant-design/icons";
import {data} from "./sample-data";
import {Do, Dont, Warn} from "./DoOrDont";
import "./breed-page.css";
import {useBreedTab} from "../routing/useBreedTab";
import {BreedResults} from "../search-results/BreedResults";
import {DogOrCat} from "../strings/species";
import {useBreedSeoTitle} from "../seo/useBreedSeoTitle";
import {BreedRescues} from "./BreedRescues";
import {Care} from "./Care";
import {useWindowWidth} from "@react-hook/window-size";
import {IconAndText} from "../util/IconAndText";

const {TabPane} = Tabs;

export interface TabData {
    label: string;
    slug: string;
    icon: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}

const AntTabs = ({data}: { data: TabData[] }) => {
    const width = useWindowWidth();
    const {activeTab, onChange} = useBreedTab();
    return (
        <Tabs
            type="card"
            size={width > 480 ? "large" : "small"}
            tabBarGutter={width > 489 ? 10 : 0}
            activeKey={activeTab}
            onChange={onChange}
            className="breed-tabs"
        >
            {data.map((obj, i) => (
                <TabPane
                    className={`breed-tab-content ${obj.slug}`} //note: className seems to apply to the content area rather than the tab itself
                    key={obj.slug}
                    tab={
                        <span className="breed-tab">
                            <IconAndText icon={obj.icon} text={obj.label}/>
                        </span>
                    }
                >
                    {obj.content}
                </TabPane>
            ))}
        </Tabs>
    );
};

export const Paragraphs = ({text}: { text: string }) => {
    const paragraphs = text.split("\n").filter((t) => !!t);
    return (
        <>
            {paragraphs.map((content, i) => (
                <p key={i}>{content}</p>
            ))}
        </>
    );
};

export const RenderBlock = (props: BlockData) => {
    switch (props.block) {
        case "do":
            return <Do title={props.text}/>;
        case "dont":
            return <Dont title={props.text}/>;
        case "warn":
            return <Warn title={props.text}/>;
        case "subtitle":
            return <h4>{props.text}</h4>; //TODO
        case "p":
            return <p>{props.text}</p>;
        case "timeline":
            return <HistoryTimeline items={props.items}/>;
        default:
            return null;
    }
};

export const textToBlocks = (text: string): BlockData[] => {
    return text
        .split("\n")
        .filter((t) => !!t)
        .map((t) => ({block: "p", text: t}));
};

export const RenderBlocks = ({data}: { data: string | BlockData[] }) => {
    const converted: BlockData[] =
        typeof data === "string" ? textToBlocks(data) : data;
    return (
        <>
            {converted.map((block, i) => (
                <RenderBlock key={i} {...block} />
            ))}
        </>
    );
};

export const TopSection = ({ratings}: Pick<BreedData, 'ratings'>) => {
    const width = useWindowWidth();
    return (
        <div className="breed-top">
            <BasicInfo/>
            {width >= 1024 &&
                <RatingsBox ratings={ratings} className="condensed"/>
            }
        </div>
    );
}

export const BreedPage = ({history, pros, cons, ratings, ...data}: BreedData) => {

    const width = useWindowWidth();

    const tabs: TabData[] = [
        {
            label: "Adoptables",
            slug: "adopt",
            icon: <HomeOutlined/>, //<HeartOutlined />,
            content: <BreedResults id={"128"} name={"Dalmation"} species={DogOrCat.DOG}/>
        },
        {
            label: "Rescues",
            slug: "rescues",
            icon: <EnvironmentOutlined/>,
            content: <BreedRescues/>
        },
        {
            label: "Pros & Cons",
            slug: "",
            icon: <BarsOutlined/>, //<ProfileOutlined />
            content: (
                <>
                    {width < 1024 && <RatingsBox ratings={ratings} className="horizontal condensed"/>}
                    <ProsAndCons pros={pros} cons={cons}/>
                </>
            )
        },
        {
            label: "Care",
            slug: "care",
            icon: <CommentOutlined/>,
            content: (
                <Care {...data}/>
            )
        },
        {
            label: "History",
            slug: "history",
            icon: <CalendarOutlined/>,
            content: <RenderBlocks data={history}/>
        },
    ];

    useBreedSeoTitle();

    return (
        <div id="breed-page">
            <TopSection ratings={ratings}/>
            <AntTabs data={tabs}/>
        </div>
    );
};

export default () => <BreedPage {...data} />;
