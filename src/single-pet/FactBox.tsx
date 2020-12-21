import {Animal} from "../clientRg/attributes";
import React, {ReactNode} from "react";
import {Col, Row} from "antd";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import {isDefined} from "@lindapaiste/ts-helpers";
import {
    activityLevelValues,
    energyLevelValues,
    FenceNeeds,
    newPeopleReactionValues,
    obedienceTrainingValues,
    vocalLevelValues
} from "../strings/enums";
import {EnumBar} from "./FactBar";
import "./fact-box.css";
import {PropSpecies, speciesLabel} from "../strings/species";
import {IconAndText} from "../util/IconAndText";

/**
 * for each fact, want to skip over if not set
 * want to not even include the heading if there isn't any content //TODO
 */
export interface SectionProps {
    slug: string;
    title: string | ReactNode;
    children?: ReactNode;
}

/**
 * Cannot use children because children prop is special -- always an array of react element objects, even if the
 * element renders null.  For the same reason, must call function components as functions rather than with JSX.
 */
export const ConditionalFactsSection = ({slug, title, facts}: SectionProps & { facts: ReactNode[] }) => {
    const filtered = facts.filter(f => !!f);
    //console.log(facts, filtered);
    if (filtered.length < 1) {
        return null;
    }
    return (
        <div className={`facts-section ${slug}`}>
            <h3>{title}</h3>
            <Row>
                {filtered.map((node, i) => ( //TODO get key from node, but have to TS check
                    <Col key={i} xs={12} sm={8} md={24} lg={12}>
                        {node}
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export const Personality = (props: Partial<Animal>) => {
    return (
        <ConditionalFactsSection
            title="My Personality"
            slug="personality"
            facts={[
                EnumBar({
                    title: "Activity Level",
                    value: props.activityLevel,
                    ordered: activityLevelValues,
                }),
                EnumBar({
                    title: "Energy Level",
                    value: props.energyLevel,
                    ordered: energyLevelValues,
                }),
                EnumBar({
                    title: "Vocal Level",
                    value: props.vocalLevel,
                    ordered: vocalLevelValues,
                }),
                EnumBar({
                    title: "Obedience",
                    value: props.obedienceTraining,
                    ordered: obedienceTrainingValues,
                }),
                EnumBar({
                    title: "Likes Strangers",
                    value: props.newPeopleReaction,
                    ordered: newPeopleReactionValues,
                }),
            ]}
        />
    )
}


/**
 * true => "Kids OK"
 * false => "No Kids"
 * undefined => null
 */
const IsOkHelper = ({name, value}: { value?: boolean, name: string }) => {
    if (value === undefined) {
        return null;
    }
    const string = value ? `${name} OK` : `No ${name}`;
    return (
        <Bullet
            title={string}
        />
    )
}

const BooleanBullet = ({value, ifTrue, ifFalse}: { value?: boolean, ifTrue: ReactNode, ifFalse?: ReactNode }) => {
    if (value === undefined || (!value && ifFalse === undefined)) {
        return null;
    }
    return (
        <Bullet
            title={value ? ifTrue : ifFalse}
        />
    )
}

const fenceString = (value: FenceNeeds): string => {
    switch (value) {
        case "3 foot":
            return "3-Foot Fence";
        case "6 foot":
            return "6-Foot Fence";
        case "Not required":
            return "No Fence Needed";
        case "Any type":
        default:
            return "Fence Required";

    }
}

export const Health = (props: Partial<Animal>) => {
    return (
        <ConditionalFactsSection
            slug="health"
            title="My Health"
            facts={[
                BooleanBullet({
                    value: props.isSpecialNeeds,
                    ifTrue: "Special Needs",
                }),
                BooleanBullet({
                    value: props.isAltered,
                    ifTrue: props.sex === "Female" ? "Spayed" : props.sex === "Male" ? "Neutered" : "Fixed",
                }),
                BooleanBullet({
                    value: props.isDeclawed,
                    ifTrue: "Declawed",
                }),
                BooleanBullet({
                    value: props.isMicrochipped,
                    ifTrue: "Microchipped",
                }),
                BooleanBullet({
                    value: props.isCurrentVaccinations,
                    ifTrue: "Vaccinations up-to-date",
                }),
            ]}
        />
    )
}

/**
 * doing it this way in order to group yes and nos together
 */
const GoodWith = (props: Partial<Animal>): ReactNode[] => {
    let yes: string[] = [];
    let no: string[] = [];

    const helper = (value: boolean | undefined, string: string) => {
        if (value === true) {
            yes.push(string);
        } else if (value === false) {
            no.push(string);
        }
    }
    if (props.adultSexesOk === "Women Only") {
        no.push("Men");
    } else if (props.adultSexesOk === "Men Only") {
        no.push("Women");
    }

    helper(props.isKidsOk, "Kids");
    helper(props.isSeniorsOk, "Seniors");
    helper(props.isCatsOk, "Cats");
    helper(props.isDogsOk, "Dogs");
    helper(props.isFarmAnimalsOk, "Farm Animals");

    return [
        ...yes.map(str => (
            <Bullet
                key={str}
                title={str + " OK"}
            />
        )),
        ...no.map(str => (
            <Bullet
                key={str}
                title={"No " + str}
                icon={<CloseCircleOutlined/>}
            />
        ))
    ]
}

export const IdealHome = (props: Partial<Animal> & PropSpecies) => {
    return (
        <ConditionalFactsSection
            slug="ideal-home"
            title="My Ideal Home"
            facts={[
                props.ownerExperience === "Species" && (
                    <Bullet
                        title={`Experienced ${speciesLabel(props.species, 'singular')} Owner`}
                    />
                ),
                props.ownerExperience === "Breed" && (
                    <Bullet
                        title="Owner with Breed Experience"
                    />
                ),
                isDefined(props.indoorOutdoor) && (
                    <Bullet
                        title={props.indoorOutdoor}
                    />),
                isDefined(props.isYardRequired) && (
                    <Bullet
                        title={props.isYardRequired ? "Yard Required" : "Yard Not Required"}
                    />
                ),
                isDefined(props.fenceNeeds) && (
                    <Bullet
                        title={fenceString(props.fenceNeeds as FenceNeeds)}
                    />
                ),
                ...GoodWith(props),
            ]}
        />
    )
}

export interface BulletData {
    title: ReactNode;
    description?: ReactNode;
}

export const Bullet = ({title, description, icon = <CheckCircleOutlined/>}: BulletData & { icon?: ReactNode }) => (
    <span className="bullet">
        <IconAndText icon={icon} text={title}/>
        {!!description && <div className="bullet-description">{description}</div>}
    </span>
)
