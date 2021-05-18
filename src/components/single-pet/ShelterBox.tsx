import React, { PropsWithChildren, ReactNode } from "react";
import { Card } from "antd";
import {
  EnvironmentOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { getAttributes } from "../../services/rescuegroups-api/entities/selectors";
import { useRequireOrg } from "../../services/rescuegroups-api/entities/useRequireEntity";
import { useEntitiesSelector } from "../../services/store";
import "./shelter-box.less";
import { Organization } from "../../services/rescuegroups-api/schema/attributes";

interface ActionProps {
  icon?: ReactNode;
  label?: ReactNode;
}

const ShelterAction = ({
  icon,
  label,
  children,
}: PropsWithChildren<ActionProps>) => {
  return (
    <div className="action-group">
      <div className="icon-area">
        {icon}
        <span className="label">{label}</span>
      </div>
      <div className="content-area">{children}</div>
    </div>
  );
};

const ShelterBox = ({
  name,
  citystate,
  phone,
  postalcode,
  street,
  url,
}: Partial<Organization>) => {
  return (
    <Card className="shelter-box" title={name}>
      <div>
        <ShelterAction icon={<EnvironmentOutlined />} label="Address">
          {!!street && <div>{street}</div>}
          <div>
            {citystate} {postalcode}
          </div>
        </ShelterAction>
        {!!phone && (
          <ShelterAction icon={<PhoneOutlined />} label="Phone">
            <a href={`tel:${phone}`}>{phone}</a>
          </ShelterAction>
        )}
        {!!url && (
          <ShelterAction icon={<GlobalOutlined />} label="Website">
            <a href={url}>{url}</a>
          </ShelterAction>
        )}
      </div>
    </Card>
  );
};

/**
 * id here is for the shelter -- not the animal
 */
export const ConnectedShelterBox = ({ id }: { id: string }) => {
  useRequireOrg(id);

  const attributes = useEntitiesSelector(getAttributes("orgs")(id));

  if (!attributes) {
    return null;
  }

  return <ShelterBox {...attributes} />;
};
// TODO: include map
// TODO: normalize URL
