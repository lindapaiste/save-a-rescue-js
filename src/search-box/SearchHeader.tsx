import {SearchFormState} from "./types";
import React, {useEffect} from "react";
import {LocationSelect} from "./location/LocationSelect";
import {sexValues, sizeGroupValues} from "../strings/enums";
import {speciesOptions} from "./fields/SpeciesSelect";
import {Collapse, Form, Radio, Select} from "antd";
import {stringOptions} from "./fields/options";
import {useAgeGroupOptions} from "./fields/AgeGroupSelect";
import {MultiSelect} from "./fields/MultiSelect";
import {useBreeds} from "../connected/useBreeds";
import "./search-header.css";
import {DogOrCat, EITHER_VAL, isCat, isDog, isDogOrCat, MaybeDogOrCat} from "../strings/species";
import {SelectProps} from "antd/es/select";
import {distanceOptions} from "./fields/DistanceSelect";
import {useWindow} from "../util/useWindow";
import {RenderZipOnly} from "./location/RenderZipOnly";
import {FormInstance} from "antd/es/form";
import {MyMultiSelect} from "./fields/MyMultiSelect";
//import ControlOutlined from "@ant-design/icons/ControlOutlined";

export interface Props {
    initialValues: SearchFormState;
    onValuesChange: (changedValues: Partial<SearchFormState>, values: SearchFormState) => void;
//    form: FormInstance<SearchFormState>;
}

export const SearchHeader = ({initialValues, onValuesChange}: Props) => {

    const [form] = Form.useForm<SearchFormState>();

    console.log(form.getFieldsValue())

    const {width} = useWindow();

    const layout = width >= 1000 || width < 480 ? "vertical" : "inline";

    const species = form.getFieldValue('species');

    return (
        <div className="search-box">
            <Form
                form={form}
                layout={layout}
                initialValues={initialValues}
                onValuesChange={onValuesChange}
            >
                <Form.Item
                    name="species"
                    //label="Species"
                >
                    <Radio.Group
                        className="select species"
                        options={speciesOptions}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Location"
                    className="location"
                >
                    <LocationSelect
                        Render={RenderZipOnly}
                    />
                </Form.Item>

                {width > 480 ? (
                    <Filters species={species}/>
                ) : (
                    <Collapse>
                        <Collapse.Panel key={1} header={<>
                            <div className="collapse-header">Advanced Options</div>
                            <div className="collapse-sub-header">Age, Size, Breed, etc.</div>
                        </>}>
                            <Filters species={species}/>
                        </Collapse.Panel>
                    </Collapse>
                )}
            </Form>
        </div>
    )
}

/**
 * the part which needs to be collapsed on small screens
 */
const Filters = ({species}: { species: MaybeDogOrCat }) => {
    return (
        <>
            <Form.Item
                name="distance"
                label="Distance"
            >
                <Select
                    className="select distance"
                    placeholder="Any Distance"
                    options={distanceOptions}
                />
            </Form.Item>

            <Form.Item
                name={isDog(species) ? "breedDogs" : isCat(species) ? "breedCats" : undefined}
                label="Breed"
                help={isDogOrCat(species) ? undefined : "Select Dogs or Cats to enable breed filtering"}
            >
                {isDogOrCat(species) ?
                    <MultiSelectBreed
                        className="select breed"
                        species={species}
                        placeholder="Any Breed"
                    />
                    :
                    <Select
                        className="select breed"
                        placeholder="Any Breed"
                        disabled={true}
                    />
                }
            </Form.Item>
            <Form.Item
                name="ages"
                label="Age"
            >
                <MultiSelect
                    className="select age"
                    placeholder="Any Age"
                    options={useAgeGroupOptions(species)}
                />
            </Form.Item>
            <Form.Item
                name="sex"
                label="Sex"
            >
                <MultiSelect
                    className="select sex"
                    placeholder="Any Sex"
                    options={stringOptions(sexValues)}
                />
            </Form.Item>
            <Form.Item
                name="sizes"
                label="Size"
            >
                <MultiSelect
                    className="select size"
                    placeholder="Any Size"
                    options={stringOptions(sizeGroupValues)}
                />
            </Form.Item>
        </>
    )
}

/**
 * need to move breed select into separate component in order to call the useBreeds hook conditionally on species
 */
const MultiSelectBreed = ({species, ...props}: SelectProps<string> & { species: DogOrCat }) => {

    const {breeds, isLoading} = useBreeds(species);

    return (
        <MultiSelect
            {...props}
            options={breeds}
            loading={isLoading}
        />
    )
}
