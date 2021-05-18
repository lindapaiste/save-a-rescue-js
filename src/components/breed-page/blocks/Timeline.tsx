import { Timeline } from "antd";
import React, { ReactNode } from "react";
import "./timeline.less";

export interface TimelineItem {
  title?: string;
  content: string;
  label?: string;
  dot?: ReactNode;
}

export const HistoryTimeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <>
      <Timeline mode="left">
        {items.map((item) => (
          <Timeline.Item
            label={item.label}
            dot={item.dot}
            color="primary"
            key={item.title}
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
