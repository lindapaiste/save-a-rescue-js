import { Collapse, Form, Radio } from "antd";
import React from "react";
import { SearchFormState } from "./types";
import { LocationSelect } from "./location/LocationSelect";
import { speciesOptions } from "./fields/SpeciesSelect";
import "./search-header.less";
import { useWindow } from "../../util/useWindow";
import { RenderZipOnly } from "./location/RenderZipOnly";
import { Filters } from "./Filters";

export interface Props {
  initialValues: SearchFormState;
  onValuesChange: (
    changedValues: Partial<SearchFormState>,
    values: SearchFormState
  ) => void;
  //    form: FormInstance<SearchFormState>;
}

export const SearchHeader = ({ initialValues, onValuesChange }: Props) => {
  const [form] = Form.useForm<SearchFormState>();

  const { width } = useWindow();

  const layout = width >= 1000 || width < 480 ? "vertical" : "inline";

  const species = form.getFieldValue("species");

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
          // label="Species"
        >
          <Radio.Group
            className="select species"
            options={speciesOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item name="location" label="Location" className="location">
          <LocationSelect Render={RenderZipOnly} />
        </Form.Item>

        {width > 480 ? (
          <Filters species={species} />
        ) : (
          <Collapse>
            <Collapse.Panel
              key={1}
              header={
                <>
                  <div className="collapse-header">Advanced Options</div>
                  <div className="collapse-sub-header">
                    Age, Size, Breed, etc.
                  </div>
                </>
              }
            >
              <Filters species={species} />
            </Collapse.Panel>
          </Collapse>
        )}
      </Form>
    </div>
  );
};
