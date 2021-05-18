import { RgEntityAttributes, RgEntityType } from "../schema/attributes";
import { RgRelationships } from "../schema/response";

export interface RgStateEntity<T extends RgEntityType> {
  /**
   * Unique id of the entity.
   * It is a number as a string.
   */
  id: string;
  /**
   * Entity type name.
   */
  type: T;
  /**
   * The properties of the entity.
   */
  attributes: RgEntityAttributes[T];
  /**
   * Relationships must be optional because it is present if the
   * entity comes from `data` but not if it comes from `included`.
   *
   * Entities from `included` have an optional `links` property instead.
   */
  relationships?: RgRelationships;
}

/**
 * use Record string | number in order to allow accessing by numeric strings, since JS treats them equivalently
 *
 * don't need any sort of meta here -- either it's loaded or it isn't
 */
export type RgEntitiesState = {
  [T in RgEntityType]: Record<number | string, RgStateEntity<T>>;
};

export const initialState: RgEntitiesState = {
  animals: {},
  breeds: {},
  colors: {},
  patterns: {},
  species: {},
  statuses: {},
  locations: {},
  orgs: {},
  pictures: {},
  videourls: {},
  videos: {},
};
