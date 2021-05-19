import "./breed-page.less";
import React, { ReactNode } from "react";
import { Tabs } from "antd";
import {
  BarsOutlined,
  CalendarOutlined,
  CommentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useWindowWidth } from "@react-hook/window-size";
import { BreedData } from "./types";
import { ProsAndCons } from "./ProsAndCons";
import { RatingsBox } from "./RatingsBox";
import { BasicInfo } from "./BasicInfo";
import dalamatianData from "./example-data/sample-data.json";
import { useBreedTab } from "./useBreedTab";
import { BreedResults } from "../search-results/BreedResults";
import { DogOrCat } from "../../services/species/species";
import { useBreedSeoTitle } from "./useBreedSeoTitle";
import { Care } from "./Care";
import { IconAndText } from "../../util/IconAndText";
import { RenderBlocks } from "./blocks/RenderBlock";

const { TabPane } = Tabs;

interface TabData {
  label: string;
  slug: string;
  icon: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

const AntTabs = ({ data }: { data: TabData[] }) => {
  const width = useWindowWidth();
  const { activeTab, onChange } = useBreedTab();
  return (
    <Tabs
      type="card"
      size={width > 480 ? "large" : "small"}
      tabBarGutter={width > 489 ? 10 : 0}
      activeKey={activeTab}
      onChange={onChange}
      className="breed-tabs"
    >
      {data.map((obj) => (
        <TabPane
          className={`breed-tab-content ${obj.slug}`} // note: className seems to apply to the content area rather than the tab itself
          key={obj.slug}
          tab={
            <span className="breed-tab">
              <IconAndText icon={obj.icon} text={obj.label} />
            </span>
          }
        >
          {obj.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export const BreedPage = ({
  history,
  pros,
  cons,
  ratings,
  ...data
}: BreedData) => {
  const width = useWindowWidth();

  const tabs: TabData[] = [
    {
      label: "Adoptables",
      slug: "",
      icon: <HomeOutlined />,
      content: (
        <BreedResults id="128" name="Dalmatian" species={DogOrCat.DOG} />
      ),
    },
    {
      label: "Pros & Cons",
      slug: "facts",
      icon: <BarsOutlined />,
      // TODO: how to access less breakpoints in code?
      content: (
        <>
          {width < 992 && (
            <RatingsBox ratings={ratings} className="horizontal condensed" />
          )}
          <ProsAndCons pros={pros} cons={cons} />
        </>
      ),
    },
    {
      label: "Care",
      slug: "care",
      icon: <CommentOutlined />,
      content: <Care {...data} />,
    },
    {
      label: "History",
      slug: "history",
      icon: <CalendarOutlined />,
      content: <RenderBlocks data={history} />,
    },
  ];

  useBreedSeoTitle();

  return (
    <div id="breed-page">
      <div className="breed-top">
        <BasicInfo {...data} />
        {width >= 992 && <RatingsBox ratings={ratings} className="condensed" />}
      </div>
      <AntTabs data={tabs} />
    </div>
  );
};

/**
 * Note: type assertion is needed because JSON interprets
 * block name as type `string` instead of a specific string literal.
 */
const Dalmatian = () => <BreedPage {...(dalamatianData as BreedData)} />;
export default Dalmatian;
