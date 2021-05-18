import { Button } from "antd";
import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { FetchHook } from "../../services/rescuegroups-api/entities/useRequireEntity";
import { Error } from "./Error";

/**
 * Fetch errors include a `Retry` button.
 */
export const FetchError = ({
  error,
  load,
  title,
}: Pick<FetchHook, "error" | "load"> & { title?: string }) => {
  return (
    <Error title={title} message={error}>
      <Button icon={<SyncOutlined />} onClick={load}>
        Retry
      </Button>
    </Error>
  );
};
