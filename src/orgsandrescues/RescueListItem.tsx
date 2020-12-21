import {RescueOrg} from "./types";
import React from "react";
import {Link} from "react-router-dom";
import {rescueListing} from "../routing/paths";
import {milesAway} from "../strings/distance";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";
import MailOutlined from "@ant-design/icons/MailOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import ExportOutlined from "@ant-design/icons/ExportOutlined";
import GlobalOutlined from "@ant-design/icons/GlobalOutlined";
import "./rescue-list.css";

export const RescueListItem = (props: RescueOrg & { distance?: number }) => {
    const {title, slug, location, phone, email, facebook, twitter, website, isVerified, id, distance} = props;
    const {address} = location;
    return (
        <div className="rescue-list-item">
            <div className="title">
                <Link
                    to={rescueListing(slug)}
                    title={title}
                >{title}</Link>
            </div>
            <div className="sabai-directory-info sabai-clearfix">
                <div className="sabai-directory-location">
                    <span className="address"><EnvironmentOutlined/>{address}</span>
                    {/*TODO: fix -- */
                        distance && <span className="distance">{milesAway(distance)}</span>
                    }
                </div>
                <div className="sabai-directory-contact">
                    {!!phone && <div className="sabai-directory-contact-tel"><PhoneOutlined/> <span>{phone}</span></div>
                        //TODO: strip formatting for href
                        //TODO: clickable on mobile only
                    }
                    {!!email &&
                    <div className="sabai-directory-contact-email"><MailOutlined/> <a
                        href={`mailto:${email}`} target="_blank" rel="noreferrer">{email}</a></div>
                    }
                    {!!website &&
                    <div className="sabai-directory-contact-website"><GlobalOutlined/> <a
                        href={website} target="_blank" rel="external noreferrer">{website}</a>
                    </div>
                    }
                </div>
                <div className="sabai-directory-social">
                </div>
            </div>
            <div className="sabai-directory-custom-fields">
            </div>
        </div>
    )
}
