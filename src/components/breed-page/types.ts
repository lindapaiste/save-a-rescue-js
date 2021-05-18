import { TimelineItem } from "./blocks/Timeline";
import { Rating } from "./RatingsBox";

export interface TitleAndText {
  title: string;
  text?: string;
}

export interface FactData {
  label: string;
  value: string;
  units?: string;
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
    id: string;
  };
}

export type BlockData = {
  [K in keyof SupportedBlocks]: { block: K } & SupportedBlocks[K];
}[keyof SupportedBlocks];

export interface CareData {
  temperament: string | BlockData[];
  health: string | BlockData[];
  grooming: string | BlockData[];
  exercise: string | BlockData[];
  training: string | BlockData[];
}

export interface BasicInfoData {
  image: {
    src: string;
    width: number;
    height: number;
    credit: string;
  };
  name: string;
  facts: FactData[];
}

export interface BreedData extends CareData, BasicInfoData {
  pros: TitleAndText[];
  cons: TitleAndText[];
  ratings: Rating[];
  history: string | BlockData[];
}
