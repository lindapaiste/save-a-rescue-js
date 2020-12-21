import {ReactNode} from "react";
import {TimelineItem} from "./Timeline";
import {Rating} from "./RatingsBox";

export interface TitleAndText {
  title: ReactNode;
  text?: ReactNode;
}

export interface SupportedBlocks {
  p: {
    text: string;
  };
  do: {
    text: string;
  };
  dont: {
    text: string;
  };
  subtitle: {
    text: string;
  };
  warn: {
    text: string;
  };
  timeline: {
    items: TimelineItem[];
  };
}

export type BlockData = {
  [K in keyof SupportedBlocks]: { block: K } & SupportedBlocks[K];
}[keyof SupportedBlocks];

export interface BreedData {
  pros: TitleAndText[];
  cons: TitleAndText[];
  ratings: Rating[];
  temperament: string | BlockData[];
  health: string | BlockData[];
  grooming: string | BlockData[];
  exercise: string | BlockData[];
  training: string | BlockData[];
  history: string | BlockData[];
  image: {
    src: string;
    credit: string;
  };
  name: string;
  facts: Record<string, string>;
}
