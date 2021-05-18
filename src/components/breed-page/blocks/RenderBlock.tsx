import React from "react";
import { BlockData } from "../types";
import { Do, Dont, Warn } from "./DoOrDont";
import { HistoryTimeline } from "./Timeline";

/**
 * Assign each block type to the appropriate component.
 */
const RenderBlock = (props: BlockData) => {
  switch (props.block) {
    case "do":
      return <Do title={props.text} />;
    case "dont":
      return <Dont title={props.text} />;
    case "warn":
      return <Warn title={props.text} />;
    case "subtitle":
      return <h4>{props.text}</h4>; // TODO
    case "p":
      return <p>{props.text}</p>;
    case "timeline":
      return <HistoryTimeline items={props.items} />;
    default:
      return null;
  }
};

/**
 * Unformatted text can be rendered as a series of paragraph blocks.
 */
const textToBlocks = (text: string): BlockData[] => {
  return text
    .split("\n")
    .filter((t) => !!t)
    .map((t) => ({ block: "p", text: t }));
};

/**
 * Note: There will be a unique id for each block when using actual WP Gutenberg block data.
 * But the same data doesn't have that.
 * So use the text as key, and add an id property to blocks without text property.
 */
const getKey = (block: BlockData): string =>
  block.block === "timeline" ? block.id : block.text;

/**
 * Loop through an array of block data and render each block.
 */
export const RenderBlocks = ({ data }: { data: string | BlockData[] }) => {
  const converted: BlockData[] =
    typeof data === "string" ? textToBlocks(data) : data;
  return (
    <>
      {converted.map((block) => (
        <RenderBlock key={getKey(block)} {...block} />
      ))}
    </>
  );
};
