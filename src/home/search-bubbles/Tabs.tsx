import {SearchBoxSchema} from "./types";
import React, {useState} from "react";
import {IconAndText} from "../../util/IconAndText";
import {SearchForm} from "./Seach-Form";
import { Sprite } from "./Sprite";

export const RenderTabs = ({searches}: { searches: SearchBoxSchema[] }) => {
    const [selected, setSelected] = useState<SearchBoxSchema>(searches[0]);

    return (
        <div className="tabbed-search-wrapper">
            <div className="tabbed-search-box">
                <ul className="search-tabs">
                    {searches.map((tab) => {
                        const {slug, icon, label} = tab;
                        const isActive = selected.slug === tab.slug;
                        return (
                        <li
                            key={slug}
                            className={`${slug} ${isActive ? "active" : ""}`}
                            onClick={() => setSelected(tab)}
                        >
                            <IconAndText
                                icon={<Sprite slug={slug} active={isActive}/>}
                                text={label}
                            />
                        </li>
                    )
                    })}
                </ul>
                <SearchForm
                    {...selected}
                    title={`Search For ${selected.label}`}
                    isBubble={false}
                />
            </div>
        </div>
    )
}
