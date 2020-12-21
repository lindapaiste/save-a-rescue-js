import {DogOrCat, speciesLabel} from "../strings/species";
import {useUserLocation} from "../location/useUserLocation";
import {SearchFormState} from "../search-box/types";
import React, {useMemo} from "react";
import {useSearchResults} from "../connected/useSearchResults";
import {Placement} from "../pet-card/types";

import "slick-carousel/slick/slick.css";
import "../elements/slider/slick-modified.less";
import {ConnectedPetCard} from "../connected/ConnectedPetCard";
import range from "lodash/range";
import {LoadingCard} from "../pet-card/LoadingCard";
import {LeftOutlined, RightOutlined} from "../elements/icons";
import {ChevronHoverButton} from "../elements/chevron-button/ChevronHoverButton";
import {SearchLink} from "../routing/SearchLink";
import {MySlider} from "../elements/slider/MySlider";

export interface Props {
    species: DogOrCat;
    count?: number;
}

type PetGridItem = {
    isLoading: true;
    id?: string
} | {
    isLoading: false;
    id: string;
}

/**
 * TODO: sort by newest first -- but if doing that, need to limit the distance
 * probably need to progressively increase radius if no matches on smallest
 * if limiting radius, also need to do a global search in order to get the total count
 */
export const SpeciesLatest = ({species, count = 12}: Props) => {
    const location = useUserLocation();

    const args: Partial<SearchFormState> = useMemo(() => ({
        location,
        species,
        //sort: SearchSort.NEWEST,
        hasPic: true,
    }), [location, species]);

    const results = useSearchResults(args);

    const ids = results.animalIds?.slice(0, count);

    const loadedIds = results.animalIds ?? [];
    const indexId = (i: number): string | undefined => results.animalIds?.[i];
    const items: (string | undefined)[] = range(0, count).map(n => loadedIds[n]);

    /* const item: PetGridItem[] = range(0, count).map(n => {
        const id = ids ? ids[n] : undefined;
        return {
            isLoading: !! id,
            id
        }
    })*/

    const speciesName = speciesLabel(species, 'plural');

    return (
        <section className={`home-adoptable-pets home-adoptable-${speciesName.toLowerCase()}`}>
            <h2>Adoptable <span className="species">{speciesName}</span></h2>
            <MySlider
                dots={false}
                arrows={true}
                slidesToShow={4}
                prevArrow={<LeftOutlined/>}
                nextArrow={<RightOutlined/>}
                responsive={[
                    {
                        breakpoint: 940,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]}
            >
                {items?.map((id, i) => (
                    <div className="pet-card-grid-wrapper" key={i}>
                        {id ?
                            <ConnectedPetCard
                                id={id}
                                placement={Placement.HOME_PAGE}
                            />
                            :
                            <LoadingCard/>
                        }
                    </div>
                ))}
            </MySlider>
            <SearchLink
                species={species}
                location={location}
            >
                <ChevronHoverButton type="primary">
                    View All {results.total?.toLocaleString() || "Adoptable"} {speciesName}
                </ChevronHoverButton>
            </SearchLink>
        </section>
    )
}
