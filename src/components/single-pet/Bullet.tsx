import { CheckCircleOutlined } from "@ant-design/icons";
import React, { ReactNode } from "react";
import { IconAndText } from "../../util/IconAndText";

export interface BulletProps {
  /**
   * Element to use as the bullet icon.
   * Default is a checkmark.
   */
  icon?: ReactNode;
  /**
   * The text for the bullet point.
   */
  title: ReactNode;
  /**
   * [Optional] A second line of additional text.
   */
  description?: ReactNode;
}

export const Bullet = ({
  title,
  description,
  icon = <CheckCircleOutlined />,
}: BulletProps) => (
  <span className="bullet">
    <IconAndText icon={icon} text={title} />
    {!!description && <div className="bullet-description">{description}</div>}
  </span>
);

export interface BooleanBulletProps {
  /**
   * Value to evaluate.
   */
  value?: boolean;
  /**
   * Element to render when value is true.
   */
  ifTrue: ReactNode;
  /**
   * [Optional] Element to render when value is false.
   */
  ifFalse?: ReactNode;
}

export const BooleanBullet = ({
  value,
  ifTrue,
  ifFalse,
}: BooleanBulletProps) => {
  if (value === undefined || (!value && ifFalse === undefined)) {
    return null;
  }
  return <Bullet title={value ? ifTrue : ifFalse} />;
};
