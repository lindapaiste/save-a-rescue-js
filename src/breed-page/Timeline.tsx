import { Timeline } from "antd";
import React, { ReactNode } from "react";
import "./timeline.css";

export interface TimelineItem {
  title?: string;
  content: string;
  label?: string;
  dot?: ReactNode;
}
export type TimelineData = TimelineItem[];

export const HistoryTimeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <>
      <Timeline mode="left">
        {items.map((item, i) => (
          <Timeline.Item
            label={item.label}
            dot={item.dot}
            color="#b92020"
            key={i}
          >
            <div>
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
