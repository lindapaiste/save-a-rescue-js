import {BreedData, TitleAndText} from "./types";
import {CheckCircleOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import "./pros-and-cons.css";
import React, {ReactNode} from "react";

const RenderItem = ({title, text, icon}: TitleAndText & { icon: ReactNode }) => {
    return (
        <li>
            <div className="icon">{icon}</div>
            <div>
                <div className="title">
                    <span className="text">{title}</span>
                </div>
                <div className="text">{text}</div>
            </div>
        </li>
    );
};

export const ProsAndCons = ({pros, cons}: Pick<BreedData, "pros" | "cons">) => {
    return (
        <div id="prosandcons">
            <section id="pros">
                <h3>Pros</h3>
                <ul>
                    {pros.map((item, i) => (
                        <RenderItem {...item} key={i} icon={<CheckCircleOutlined/>}/>
                    ))}
                </ul>
            </section>
            <section id="cons">
                <h3>Cons</h3>
                <ul id="cons">
                    {cons.map((item, i) => (
                        <RenderItem
                            {...item}
                            key={i}
                            icon={<ExclamationCircleOutlined/>}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
};
