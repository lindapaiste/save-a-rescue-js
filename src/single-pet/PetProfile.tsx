import React, {useEffect} from "react";
import {actions, useEntitiesSelector} from "../redux/store";
import {
    getAnimalAttributes,
    getAnimalImages,
    getAnimalOrgId,
    getAnimalSpecies,
    getAttributes
} from "../redux/selectors";
import {useRequireAnimal} from "../connected/useRequireEntity";
import {ShelterBox} from "./ShelterBox";
import {Loading} from "../loading/Loading";
import {Health, IdealHome, Personality} from "./FactBox";
import he from "he";
import "./pet-profile.css";
import {SlickCarousel} from "./media/SlickCarousel";
import {Col, Row} from "antd";
import {Animal} from "../client/attributes";
import {isDefined} from "@lindapaiste/ts-helpers";
import {Join} from "../util/Join";
import {BreedLink} from "../routing/BreedLink";
import {useSeoTitle} from "./useSeoTitle";
import {FetchError} from "../loading/FetchError";
import WomanOutlined from "@ant-design/icons/WomanOutlined";
import ManOutlined from "@ant-design/icons/ManOutlined";
import {usePreviousPage} from "../routing/PetLink";
import {speciesLabel} from "../strings/species";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import {SearchLink} from "../routing/SearchLink";
import {IconAndText} from "../util/IconAndText";
import {useDispatch} from "react-redux";
import {RecentlyViewed} from "./RecentlyViewed";

export interface Props {
    id: string;
}

/**
 * component handles fetching, error and loading states
 */
export const PetProfile = ({id}: Props) => {

    const previousPage = usePreviousPage();

    const images = useEntitiesSelector(getAnimalImages(id));

    const attributes = useEntitiesSelector(getAnimalAttributes(id));

    const orgId = useEntitiesSelector(getAnimalOrgId(id));

    const species = useEntitiesSelector(getAnimalSpecies(id));

    const {isError, error, load, isLoading} = useRequireAnimal(id);

    const shelter = useEntitiesSelector(getAttributes('orgs')(orgId || ""));

    useSeoTitle({
        attributes: attributes || {},
        orgId: orgId || "",
        species
    })

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.addView({id}))
    }, [dispatch, id]);

    if (isError) {
        return (
            <FetchError
                title="Error Loading Pet"
                load={load}
                error={error}
            />
        )
    }
    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="pet-profile">
            <div className="back">
                {(!!previousPage && previousPage.type === 'search') ?
                    <SearchLink
                        state={previousPage.state}
                    >
                        <IconAndText
                            icon={<ArrowLeftOutlined/>}
                            text="Return to Search Results"
                        />
                    </SearchLink>
                    :
                    <SearchLink
                        species={species}
                        //zip={shelter?.postalcode?.toString()}
                    >
                        <IconAndText
                            icon={<ArrowLeftOutlined/>}
                            text={`Search ${speciesLabel(species, 'plural')}`}
                        />
                    </SearchLink>
                }
            </div>
            {images.length > 0 && <SlickCarousel images={images}/>}
            <div className="top-titles">
                <h1 className="pet-name"><span className="meet">Meet</span> <span
                    className="name">{attributes?.name}</span></h1>
                <Breed {...attributes}/>
                <AgeSex
                    {...attributes}
                />
            </div>

            <Row className="profile-body">
                <Col xs={24} sm={24} md={6} lg={8}>
                    <IdealHome{...attributes} species={species}/>
                    <Health {...attributes}/>
                    <Personality {...attributes}/>
                </Col>
                <Col xs={24} sm={24} md={18} lg={16}>
                    <Description
                        text={attributes?.descriptionText}
                    />

                    {!!shelter &&
                    <div>
                        <h3>Get In Touch</h3>
                        <ShelterBox
                            {...shelter}
                        />
                    </div>
                    }
                    <Tracker id={id}/>
                </Col>
            </Row>
            <RecentlyViewed
                ignored={id}
            />
        </div>
    )
}

/**
 * separate by bullet -- but only if both are present!
 * show months if < 1 year old, years if > 1
 * not sure if age string is ever present when birth date is not
 * birthDate looks like: "2012-01-03T00:00:00Z"
 * doesn't need to be extremely accurate - rounding months is ok
 */
const createAge = (birthDate: string): { number: number; label: string; } => {
    const birth = new Date(birthDate);
    const today = new Date();
    // look at difference in years
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    if (years < 1) {
        return {
            number: months,
            label: "months"
        }
    }
    return {
        number: years,
        label: "years"
    }
}
const Age = ({birthDate, ageString, ageGroup}: Partial<Animal>) => {
    if (birthDate) {
        const {number, label} = createAge(birthDate);
        return (
            <span className="age">
                <span className="age-number">{number}</span>
                {" "}
                <span className="age-label">{label}</span>
            </span>
        )
    } else if (ageString || ageGroup) {
        return (
            <span className="age">{ageString || ageGroup}</span>
        )
    }
}

const AgeSex = ({sex, ...props}: Partial<Animal>) => {
    const ageComponent = Age(props);
    return (
        <div className="sex-age">
            {isDefined(sex) && (
                <>
                <span className="sex-icon">
                    {sex === "Male" ? <ManOutlined/> : <WomanOutlined/>}
                </span>{" "}
                    <span className="sex">{sex}</span>
                </>
            )}
            {!!sex && ageComponent !== null && (
                <span className="separator"> • </span>
            )}
            {ageComponent}
        </div>
    )
}

const Breed = ({breedPrimaryId, breedSecondaryId, isBreedMixed}: Partial<Animal>) => {
    const hasBreed = !!breedPrimaryId || !!breedSecondaryId;
    if (!hasBreed) {
        return isBreedMixed ? (
            <div className="breed">Mixed Breed</div>
        ) : null;
    }
    return (
        <div className="breed">
            <Join
                array={[breedPrimaryId, breedSecondaryId].filter(isDefined).map(id => (
                    <BreedLink id={id.toString()} key={id}/>
                ))}
                separator={" / "}
            />
            {isBreedMixed && " Mix"}
        </div>
    )
}

/**
 * clean up and print out description text
 */
const Description = ({text}: { text?: string }) => {
    if (!text) {
        return null;
    }
    //fixes &amp and other html encoded entities. still has &nbsp, but browser can handle
    const clean = he.decode(text);
    //break on line breaks, removing empty from doubles or at start and end
    const paragraphs = clean.split("\n").filter(s => s.length);

    return (
        <div className="description">
            {paragraphs.map((s, i) => (
                <p key={i}>{s}</p>
            ))}
        </div>
    )
}

/**
 * need to render tracking pixel when using non-html description
 */
const Tracker = ({id}: { id: string }) => {
    return (
        <img
            src={`https://tracker.rescuegroups.org/pet?${id}`}
            width="0"
            height="0"
            alt=""
        />
    )
}
