import React from "react";
import {ResultsGrid} from "./ResultsGrid";
import {SearchReturns} from "../connected/useSearchResults";
import {PropSpecies, speciesLabel} from "../strings/species";
import {Button} from "antd";
import {isDefined} from "@lindapaiste/ts-helpers";
import {FetchError} from "../loading/FetchError";
import "./search-page.css";
import {PropPreviousPage} from "../routing/PetLink";

export interface Props extends SearchReturns, PropPreviousPage, PropSpecies {
}

export const RenderSearchResults = ({isLoading, animalIds, total, species, loadNext, isLoadedAll, isError, error, load, previous}: Props) => (
    <div className="search-results">
        <SearchNumFound
            total={total}
            species={species}
        />
        <ResultsGrid
            animalIds={animalIds || []}
            loading={isLoading ? 24 : false}
            previous={previous}
        />
        {!isLoadedAll && !!total &&
        <LoadNext onClick={loadNext}/>
        }
        {isError && (
            <FetchError
                title="Error Loading Search Results"
                error={error}
                load={load}
            />
        )}
    </div>
);

export const SearchNumFound = ({species, total}: PropSpecies & { total?: number }) => {
    if (!isDefined(total)) {
        return null;
    }
    return (
        <h2>
            <span className="number">{total.toLocaleString()}</span>
            {" "}
            <span className="pets-found">{speciesLabel(species, 'plural')} Found</span>
        </h2>
    )
}

export const LoadNext = ({onClick}: { onClick(): void }) => (
    <div className="center-contents">
        <Button
            type="primary"
            size="large"
            shape="round"
            onClick={onClick}
            style={{
                marginBottom: 16,
            }}
        >
            Load Next
        </Button>
    </div>
)
