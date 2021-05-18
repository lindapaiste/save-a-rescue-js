import React, { PropsWithChildren } from "react";
import SlickSlider, { Settings } from "@ant-design/react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "./slick-modified.less";

/**
 * add extra layer around icons to avoid warnings from props set by Slick getting passed down to the DOM
 * (Warning: React does not recognize the `currentSlide` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `currentslide` instead. If you accidentally passed it from a parent component, remove it from the DOM element.)
 * But DO need to pass through className in order to get slick-arrow and slick-next
 */
const Prev = ({ className }: { className?: string }) => (
  <LeftOutlined className={className} />
);
const Next = ({ className }: { className?: string }) => (
  <RightOutlined className={className} />
);

/**
 * wrapper around the slick slider component handles loading the CSS files, setting the arrow components, and adding
 * extra margin to account for the arrow size
 */
export const Slider = ({
  children,
  ...settings
}: PropsWithChildren<Settings>) => {
  return (
    <div
      className={`slider-content-wrapper ${settings.arrows ? "arrows" : ""}`}
    >
      <SlickSlider prevArrow={<Prev />} nextArrow={<Next />} {...settings}>
        {children}
      </SlickSlider>
    </div>
  );
};
