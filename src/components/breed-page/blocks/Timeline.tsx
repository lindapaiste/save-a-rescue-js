import { Timeline } from "antd";
import React from "react";
import "./timeline.less";

export interface TimelineItem {
  title?: string;
  content: string;
  label?: string;
}

export const HistoryTimeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <>
      <Timeline className="history-timeline" mode="left">
        {items.map((item) => (
          <Timeline.Item
            className="history-item"
            label={item.label}
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
