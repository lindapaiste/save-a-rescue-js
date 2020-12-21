/**
 * inspired by wikipedia -- sections are collapsible on mobile devices only
 * their breakpoint in 720px.  does not respond to resize.
 *
 * < 720 -- collapsed by default
 * > 720 -- collapsible on m.wikipedia but not on main domain
 * subdomain switching seems based on device rather than size?
 */
import {BreedData} from "./types";
import {Collapse} from "antd";
import React from "react";
import {RenderBlocks} from "./BreedPage";


export const Care = ({grooming, exercise, training, temperament, health}: Pick<BreedData, 'grooming' | 'exercise' | 'training' | 'temperament' | 'health'>) => {

    return (
        <Collapse
            defaultActiveKey={
                window.innerWidth < 480 ? [] : ["1", "2", "3", "4", "5"]
            }
            ghost
        >
            <Collapse.Panel header="Grooming" key="1">
                <RenderBlocks data={grooming}/>
            </Collapse.Panel>
            <Collapse.Panel header="Exercise" key="2">
                <RenderBlocks data={exercise}/>
            </Collapse.Panel>
            <Collapse.Panel header="Training" key="3">
                <RenderBlocks data={training}/>
            </Collapse.Panel>
            <Collapse.Panel header="Temperament" key="4">
                <RenderBlocks data={temperament}/>
            </Collapse.Panel>
            <Collapse.Panel header="Health" key="5">
                <RenderBlocks data={health}/>
            </Collapse.Panel>
        </Collapse>
    )

}
