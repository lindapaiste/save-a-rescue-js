import React from "react";
import { Form, Select } from "antd";
import {
  isCat,
  isDog,
  isDogOrCat,
  MaybeDogOrCat,
} from "../../services/species/species";
import { distanceOptions } from "./fields/DistanceSelect";
import { MultiSelectBreed } from "./fields/MultiSelectBreed";
import { MultiSelect } from "./fields/MultiSelect";
import { useAgeGroupOptions } from "./fields/AgeGroupSelect";
import { stringOptions } from "./fields/options";
import {
  sexValues,
  sizeGroupValues,
} from "../../services/rescuegroups-api/schema/enums";

/**
 * The part which needs to be collapsed on small screens.
 */
export const Filters = ({ species }: { species: MaybeDogOrCat }) => {
  return (
    <>
      <Form.Item name="distance" label="Distance">
        <Select
          className="select distance"
          placeholder="Any Distance"
          options={distanceOptions}
        />
      </Form.Item>

      <Form.Item
        name={
          // eslint-disable-next-line no-nested-ternary
          isDog(species)
            ? "breedDogs"
            : isCat(species)
            ? "breedCats"
            : undefined
        }
        label="Breed"
        help={
          isDogOrCat(species)
            ? undefined
            : "Select Dogs or Cats to enable breed filtering"
        }
      >
        {isDogOrCat(species) ? (
          <MultiSelectBreed
            className="select breed"
            species={species}
            placeholder="Any Breed"
          />
        ) : (
          <Select className="select breed" placeholder="Any Breed" disabled />
        )}
      </Form.Item>
      <Form.Item name="ages" label="Age">
        <MultiSelect
          className="select age"
          placeholder="Any Age"
          options={useAgeGroupOptions(species)}
        />
      </Form.Item>
      <Form.Item name="sex" label="Sex">
        <MultiSelect
          className="select sex"
          placeholder="Any Sex"
          options={stringOptions(sexValues)}
        />
      </Form.Item>
      <Form.Item name="sizes" label="Size">
        <MultiSelect
          className="select size"
          placeholder="Any Size"
          options={stringOptions(sizeGroupValues)}
        />
      </Form.Item>
    </>
  );
};
