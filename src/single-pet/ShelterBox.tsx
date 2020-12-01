import {useRequireOrg} from "../connected/useRequireEntity";
import React, {PropsWithChildren, ReactNode} from "react";
import {useEntitiesSelector} from "../redux/store";
import {getAttributes} from "../redux/selectors";
import {Card} from "antd";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";
import GlobalOutlined from "@ant-design/icons/GlobalOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import "./shelter-box.css";
import {Organization} from "../client/attributes";

/**
 * id here is for the shelter -- not the animal
 */
export const ConnectedShelterBox = ({id}: { id: string }) => {

    useRequireOrg(id);

    const attributes = useEntitiesSelector(getAttributes('orgs')(id));

    if (!attributes) {
        return null;
    }

    return (
        <ShelterBox
            {...attributes}
        />
    )
}
//TODO: include map
//TODO: normalize URL


export const ShelterBox = ({name, citystate, phone, postalcode, street, url}: Partial<Organization>) => {
    return (
        <Card className="shelter-box"
              title={name}
        >
            <div>
                <ShelterAction
                    icon={<EnvironmentOutlined/>}
                    label="Address"
                >
                    {!!street &&
                    <div>{street}</div>
                    }
                    <div>{citystate} {postalcode}</div>
                </ShelterAction>
                {!!phone &&
                <ShelterAction
                    icon={<PhoneOutlined/>}
                    label="Phone"
                >
                    <a href={`tel:${phone}`}>{phone}</a>
                </ShelterAction>
                }
                {!!url &&
                <ShelterAction
                    icon={<GlobalOutlined/>}
                    label="Website"
                >
                    <a href={url}>{url}</a>
                </ShelterAction>
                }
            </div>
        </Card>
    )
}

interface ActionProps {
    icon?: ReactNode;
    label?: ReactNode;
}

const ShelterAction = ({icon, label, children}: PropsWithChildren<ActionProps>) => {
    return (
        <div className="action-group">
            <div className="icon-area">
                {icon}
                <span className="label">{label}</span>
            </div>
            <div className="content-area">
                {children}
            </div>
        </div>
    )
}
