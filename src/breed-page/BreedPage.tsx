import { BreedData, BlockData, TitleAndText, data } from "./data";
import { ProsAndCons } from "./ProsAndCons";
import { HistoryTimeline } from "./Timeline";
import { RatingsBox } from "./RatingsBox";
import { BasicInfo } from "./BasicInfo";
import React, { useState, ReactNode } from "react";
import { Tabs, Collapse } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  ProfileOutlined,
  HomeOutlined,
  CommentOutlined,
  EnvironmentOutlined,
  BarsOutlined,
  HeartOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
const { TabPane } = Tabs;
/**
 * sections:
 * adoptables
 * rescue groups
 * info: history,
 */

export interface TabData {
  tab: string;
  icon: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

const AntTabs = ({ data }: { data: TabData[] }) => {
  return (
    <Tabs type="card" size="large">
      {data.map((obj, i) => (
        <TabPane
          key={i}
          tab={
            <span>
              {obj.icon} {obj.tab}
            </span>
          }
        >
          {obj.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export const Paragraphs = ({ text }: { text: string }) => {
  const paragraphs = text.split("\n").filter((t) => !!t);
  return (
    <>
      {paragraphs.map((content, i) => (
        <p key={i}>{content}</p>
      ))}
    </>
  );
};

interface DoOrDontConfig {
  icon: ReactNode;
  before?: ReactNode;
  slug: string;
}

const DoOrDont = ({
  title,
  text,
  icon,
  before,
  slug
}: TitleAndText & DoOrDontConfig) => {
  return (
    <div className={`dos-donts ${slug}`}>
      <span className="label">
        <span className="icon">{icon}</span>
        {!!before && <span className="text">{before}</span>}
      </span>
      {before ? " " : ""}
      <span className="title">{title}</span>
    </div>
  );
};

export const Do = (props: TitleAndText) => {
  return (
    <DoOrDont slug="do" before="Do" icon={<CheckCircleOutlined />} {...props} />
  );
};

export const Dont = (props: TitleAndText) => {
  return (
    <DoOrDont
      slug="dont"
      before="Don't"
      icon={<CloseCircleOutlined />}
      {...props}
    />
  );
};

export const Warn = (props: TitleAndText) => {
  return (
    <DoOrDont slug="warn" icon={<ExclamationCircleOutlined />} {...props} />
  );
};

export const RenderBlock = (props: BlockData) => {
  switch (props.block) {
    case "do":
      return <Do title={props.text} />;
    case "dont":
      return <Dont title={props.text} />;
    case "warn":
      return <Warn title={props.text} />;
    case "subtitle":
      return <h4>{props.text}</h4>; //TODO
    case "p":
      return <p>{props.text}</p>;
    case "timeline":
      return <HistoryTimeline items={props.items} />;
    default:
      return null;
  }
};

export const textToBlocks = (text: string): BlockData[] => {
  return text
    .split("\n")
    .filter((t) => !!t)
    .map((t) => ({ block: "p", text: t }));
};

export const RenderBlocks = ({ data }: { data: string | BlockData[] }) => {
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

export const BreedPage = ({
  history,
  pros,
  cons,
  temperament,
  health,
  grooming,
  exercise,
  training,
  ratings
}: BreedData) => {
  //const [currentTab, setCurrentTab] = useState('grooming');

  const tabs: TabData[] = [
    {
      tab: "Facts",
      icon: <BarsOutlined />, //<ProfileOutlined />
      content: (
        <>
          <RatingsBox ratings={ratings} />
          <ProsAndCons pros={pros} cons={cons} />
        </>
      )
    },
    {
      tab: "History",
      icon: <CalendarOutlined />,
      content: <RenderBlocks data={history} />
    },
    {
      tab: "Care",
      icon: <CommentOutlined />,
      content: (
        <Collapse
          defaultActiveKey={
            window.innerWidth < 480 ? [] : ["1", "2", "3", "4", "5"]
          }
          ghost
        >
          <Collapse.Panel header="Grooming" key="1">
            <RenderBlocks data={grooming} />
          </Collapse.Panel>
          <Collapse.Panel header="Exercise" key="2">
            <RenderBlocks data={exercise} />
          </Collapse.Panel>
          <Collapse.Panel header="Training" key="3">
            <RenderBlocks data={training} />
          </Collapse.Panel>
          <Collapse.Panel header="Temperament" key="4">
            <RenderBlocks data={temperament} />
          </Collapse.Panel>
          <Collapse.Panel header="Health" key="5">
            <RenderBlocks data={health} />
          </Collapse.Panel>
        </Collapse>
      )
    },
    {
      tab: "Rescues",
      icon: <EnvironmentOutlined />,
      content: "Soon"
    },
    {
      tab: "Adopt",
      icon: <HomeOutlined />, //<HeartOutlined />,
      content: "Soon"
    }
  ];

  return (
    <div id="breed-page">
      <BasicInfo />
      <AntTabs data={tabs} />
    </div>
  );
};

export default () => <BreedPage {...data} />;
