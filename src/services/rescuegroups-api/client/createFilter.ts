import { AttributeFilter, Operation } from "../schema/request";
import { RgEntityAttributes, RgEntityType } from "../schema/attributes";

export type FieldPair = {
  [K in RgEntityType]: {
    object: K;
    attribute: keyof RgEntityAttributes[K];
  };
}[keyof RgEntityAttributes];

/**
 * Allows for 'id' to be used as an attribute
 * in addition to the entity-specific properties.
 */
export type AttrWithId<T extends RgEntityType> = RgEntityAttributes[T] & {
  id: string;
};

export type OneOrMany<T> = T | T[];

/**
 * RG API has trouble with single-element arrays,
 * so pass those as just a value.
 *
 * Note: for some reason this creates TS trouble inline.
 */
const toCriteria = (
  value: AttributeFilter["criteria"]
): AttributeFilter["criteria"] =>
  Array.isArray(value) && value.length === 1 ? value[0] : value;

/**
 * Returns in a not strictly typed way, but enforces strict typing to create
 */
export const createFilter = <
  O extends RgEntityType,
  A extends keyof AttrWithId<O>
>(
  object: O,
  attribute: A,
  /**
   * A value that is used as an attribute for a filter must extend string | number.
   */
  value: OneOrMany<AttrWithId<O>[A]> & AttributeFilter["criteria"],
  operation: Operation = "equal"
): AttributeFilter => ({
  fieldName: `${object}.${attribute}`,
  operation,
  criteria: toCriteria(value),
});
