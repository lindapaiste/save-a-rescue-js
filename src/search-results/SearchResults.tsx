import React, {useState} from "react";
import {ResultsGrid, ResultsPhotos} from "./ResultsGrid";
import {SearchReturns} from "../connected/useSearchResults";
import {PropSpecies, speciesLabel} from "../strings/species";
import {Button} from "antd";
import {isDefined} from "@lindapaiste/ts-helpers";
import {FetchError} from "../loading/FetchError";
import "./search-page.css";
import {FormatSwitch, ResultsFormat} from "./FormatSwitch";
import {Placement} from "../pet-card/types";

export interface Props extends SearchReturns, PropSpecies {
    initialFormat?: ResultsFormat;
    onChangeFormat?: (format: ResultsFormat) => void;
    placement: Placement;
}

export const RenderSearchResults = ({isLoading, animalIds, total, species, loadNext, isLoadedAll, isError, error, load, initialFormat = "card", placement}: Props) => {

    const [format, setFormat] = useState(initialFormat);

    const ResultsComponent = format === "thumb" ? ResultsPhotos : ResultsGrid;

    return (
        <div className={`search-results format-${format}`}>
            <div className="controls">
                <FormatSwitch
                    format={format}
                    onChange={setFormat === undefined ? () => {
                    } : setFormat}
                />
            </div>
            <SearchNumFound
                total={total}
                species={species}
            />
            <ResultsComponent
                animalIds={animalIds || []}
                loading={isLoading ? 24 : false}
                format={format}
                placement={placement}
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
}

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
