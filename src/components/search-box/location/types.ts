import { UnionToAnyOf } from "@lindapaiste/ts-helpers";
import { ComponentType } from "react";
import { GeoLocationHookReturns } from "../../../services/location/geolocation/useGeoLocation";
import { ValidUserLocation } from "../../../services/location/types";

export interface Props {
  value?: UnionToAnyOf<ValidUserLocation>;
  onChange?: (loc: ValidUserLocation) => void;
  Render: ComponentType<RenderProps>;
}

/**
 * want to share logic for an "enter zip or use current location" component, while allowing different rendering styles
 */
export interface RenderProps extends GeoLocationHookReturns {
  onClickGeo(): void;

  onFocusZip(): void;

  isGeoSelected: boolean;
  isZipSelected: boolean;
  zip?: string;
  setZip: (zip: string) => void;
}
