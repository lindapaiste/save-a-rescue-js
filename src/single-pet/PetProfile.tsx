import React, {useEffect} from "react";
import {flatActions, useEntitiesSelector, useSelector} from "../redux/store";
import {
    getAnimalAttributes,
    getAnimalImages,
    getAnimalOrgId,
    getAnimalSpecies,
    getAttributes
} from "../redux/rgSelectors";
import {useRequireAnimal} from "../connected/useRequireEntity";
import {ShelterBox} from "./ShelterBox";
import {Loading} from "../loading/Loading";
import {Health, IdealHome, Personality} from "./FactBox";
import he from "he";
import "./pet-profile.css";
import {SlickCarousel} from "../media/SlickCarousel";
import {Col, Row} from "antd";
import {Animal} from "../clientRg/attributes";
import {isDefined, isNonNullable} from "@lindapaiste/ts-helpers";
import {Join} from "../util/Join";
import {BreedLink} from "../routing/BreedLink";
import {usePetSeoTitle} from "../seo/usePetSeoTitle";
import {FetchError} from "../loading/FetchError";
import WomanOutlined from "@ant-design/icons/WomanOutlined";
import ManOutlined from "@ant-design/icons/ManOutlined";
import {PropSpecies, speciesLabel} from "../strings/species";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import {SearchLink} from "../routing/SearchLink";
import {IconAndText} from "../util/IconAndText";
import {useDispatch} from "react-redux";
import {RecentlyViewed} from "./RecentlyViewed";
import {ageLabel, structuredAge} from "../strings/age";
import {useCanonical} from "../seo/useCanonical";
import {Link} from "react-router-dom";
import uniq from "lodash/uniq";

export interface Props {
    id: string;
}

//TODO: need to show adopted vs available - example adopted: http://localhost:3000/adoptable-dogs-cats/pet/1742442
/**
 * component handles fetching, error and loading states
 */
export const PetProfile = ({id}: Props) => {

    const images = useEntitiesSelector(getAnimalImages(id));

    const attributes = useEntitiesSelector(getAnimalAttributes(id));

    const orgId = useEntitiesSelector(getAnimalOrgId(id));

    const species = useEntitiesSelector(getAnimalSpecies(id));

    const {isError, error, load, isLoading} = useRequireAnimal(id);

    const shelter = useEntitiesSelector(getAttributes('orgs')(orgId || ""));

    const lastSearch = useSelector(state => state.lastSearch);

    usePetSeoTitle({
        attributes: attributes || {},
        orgId: orgId || "",
        species
    })

    useCanonical();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(flatActions.addView({id}))
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
                {(lastSearch) ?
                    <Link
                        to={lastSearch}
                    >
                        <IconAndText
                            icon={<ArrowLeftOutlined/>}
                            text="Return to Search Results"
                        />
                    </Link>
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
                    species={species}
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
 * separate the number from the months/years label for better styling
 * not sure if age string is ever present when birth date is not
 * fallback to age group
 */
const AgeInner = ({birthDate, ageString, ageGroup, species}: Partial<Animal> & PropSpecies) => {
    if (birthDate) {
        const {number, label} = structuredAge(birthDate);
        return (
            <>
                <span className="age-number">{number}</span>
                {" "}
                <span className="age-label">{label}</span>
            </>
        )
    } else if (ageString) {
        return ageString;
    } else if (isDefined(ageGroup)) {
        // @ts-ignore
        return ageLabel(ageGroup, species);
    } else {
        return null;
    }
}

/**
 * separate by bullet -- but only if both are present!
 * show months if < 1 year old, years if > 1
 * not sure if age string is ever present when birth date is not
 */
const AgeSex = ({sex, ...props}: Partial<Animal> & PropSpecies) => {
    const age = AgeInner(props);
    return (
        <div className="sex-age">
            <Join
                array={[
                    isDefined(sex) ? (
                        <span className="sex" key="sex">
                            <IconAndText
                                icon={sex === "Male" ? <ManOutlined/> : <WomanOutlined/>}
                                text={sex}
                            />
                        </span>
                    ) : null,
                    isNonNullable(age) ? (
                        <span className="age" key="age">
                            {age}
                        </span>
                    ) : null,
                ]}
                separator={<span className="separator"> • </span>}
            />
        </div>
    )
}

/**
 * it occasionally happens that breedPrimaryId and breedSecondaryId are the same
 */
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
                array={uniq([breedPrimaryId, breedSecondaryId]).filter(isDefined).map(id => (
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
    // he.decode fixes &amp and other html encoded entities. still has &nbsp, browser can handle &nbsp, but creates
    // double paragraph spacing if the &nbsp is the only thing in a paragraph
    const clean = he.decode(text.replaceAll('&nbsp;', ''));

    // break on line breaks, removing empty from doubles or at start and end
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
