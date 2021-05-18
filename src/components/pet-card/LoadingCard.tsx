import React from "react";
import { Card, Skeleton } from "antd";
import { SquareWrapper } from "../media/SquareImage";

export const LoadingCard = () => {
  return (
    <Card
      className="pet-card"
      cover={
        <SquareWrapper
          Content={() => (
            <div className="full-size ant-skeleton ant-skeleton-with-avatar ant-skeleton-active">
              <div className="full-size ant-skeleton-avatar" />
            </div>
          )}
        />
      }
    >
      <Skeleton loading avatar active paragraph={{ rows: 2 }} />
    </Card>
  );
};
