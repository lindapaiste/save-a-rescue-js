import qs from "qs";
import { omit } from "lodash";
import { Method } from "axios";
import {
  AttributeFilter,
  Operation,
  RgRequestData,
  RgRequestParams,
} from "../schema/request";
import { AttrWithId, createFilter, OneOrMany } from "./createFilter";
import { RgClient } from "./RgClient";
import { toFilterLocation } from "../../location/formatting/validation";
import { RgEntityType } from "../schema/attributes";
import { ValidUserLocation } from "../../location/types";
import { RgRequestAction } from "./Executable";
import { locString } from "../../search/searchArgHandling";
import { UNLIMITED_DISTANCE } from "../schema/enums";

/**
 * Generalized class can handle different request types, not just SearchFormState.
 *
 * Build a request by calling chainable methods (Builder pattern).
 *
 * Then get the request data by calling raw().
 */
export class RgRequest<T extends RgEntityType> {
  public readonly type: T;

  public readonly url: string;

  public readonly params: RgRequestParams = {};

  private data: RgRequestData = {};

  private keyParts: string[] = [];

  constructor(type: T, path?: string) {
    this.type = type;
    this.url = path ?? RgClient.entityBase(type);
  }

  /**
   * Note: Generic S here refers to the type of the entity which is used for sorting,
   * not the entity type being requested.
   * For example, can sort `animals` by `color.name`.
   */
  public setSort<S extends RgEntityType, A extends keyof AttrWithId<T>>(
    type: S,
    attribute: A,
    order: "ASC" | "DESC" = "DESC"
  ): this {
    const sign = order === "ASC" ? "+" : "-";
    this.params.sort = `${sign}${type}.${attribute}`;
    return this;
  }

  public setPage(page: number): this {
    this.params.page = page;
    return this;
  }

  public setLimit(limit: number): this {
    this.params.limit = limit;
    return this;
  }

  public setMaxLimit(): this {
    this.params.limit = RgClient.maxLimit(this.type);
    return this;
  }

  public setLocation(
    location: ValidUserLocation,
    distance: number | string = UNLIMITED_DISTANCE
  ): this {
    const distVal = +distance || UNLIMITED_DISTANCE; // cast to number
    const filterLoc = toFilterLocation(location);
    this.data.filterRadius = {
      ...filterLoc,
      miles: distVal,
    };
    this.addKeyPart("location", locString(filterLoc));
    this.addKeyPart("miles", distVal.toString());
    return this;
  }

  public addFilter<O extends RgEntityType, A extends keyof AttrWithId<O>>(
    object: O,
    attribute: A,
    value: OneOrMany<AttrWithId<O>[A]> & AttributeFilter["criteria"],
    operation: Operation = "equal"
  ): this {
    const filter = createFilter(object, attribute, value, operation);
    if (!this.data.filters) {
      this.data.filters = [];
    }
    this.data.filters.push(filter);
    this.addKeyPart(filter.fieldName, filter.criteria, filter.operation);
    return this;
  }

  private addKeyPart(label: string, value: unknown, comparison = "="): void {
    const stringVal = Array.isArray(value)
      ? value.map((el) => el.toString()).join(",")
      : String(value);
    this.keyParts.push(`${label}${comparison}${stringVal}`);
  }

  private hasData(): boolean {
    return Object.keys(this.data).length > 0;
  }

  /**
   * Key doesn't need to make sense or be readable, just needs to be
   * consistent such that the same arguments always return the same key.
   */
  get key(): string {
    const parts = [
      this.url,
      qs.stringify(omit(this.params, "page")),
      ...this.keyParts,
    ];
    return parts.sort().join("&");
  }

  get method(): Method {
    return this.hasData() ? "POST" : "GET";
  }

  /**
   * Remove anything non-serializable and just return the raw data properties of the request.
   */
  public raw(): RgRequestAction {
    return {
      type: this.type,
      key: this.key,
      args: {
        data: this.hasData() ? this.data : undefined,
        method: this.method,
        params: this.params,
        url: this.url,
      },
    };
  }
}
