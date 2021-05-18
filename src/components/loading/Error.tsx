import { Result } from "antd";
import React, { ReactNode } from "react";
import { ResultProps } from "antd/es/result";

/**
 * Wrapper around the Ant Design `Result` component.
 */
export type Props = Omit<ResultProps, "subTitle"> & {
  title?: string;
  message?: string;
  children?: ReactNode;
};

export const Error = ({
  title = "Error",
  status = "error",
  message,
  ...props
}: Props) => {
  return <Result {...props} title={title} subTitle={message} status={status} />;
};
