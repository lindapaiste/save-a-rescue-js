import {AttributeFilter, Operation} from "./request";
import {RgEntityAttributes, RgEntityType} from "./attributes";

export type FieldPair = {
    [K in RgEntityType]: {
        object: K;
        attribute: keyof RgEntityAttributes[K];
    }
}[keyof RgEntityAttributes]

type AttrWithId<T extends RgEntityType> = RgEntityAttributes[T] & {id: string};


/**
 * returns in a not strictly typed way, but enforces strict typing to create
 */
export const createFilter = <O extends RgEntityType, A extends keyof AttrWithId<O>>(object: O, attribute: A, value: AttrWithId<O>[A] | AttrWithId<O>[A][], operation: Operation = 'equal'): AttributeFilter => ({
    fieldName: `${object}.${attribute}`,
    operation,
//    criteria: Array.isArray(value) ? value.length === 1 ? value[0].toString() : value.map(el => el.toString()) : value.toString(),
    criteria: Array.isArray(value) && value.length === 1 ? value[0] : value,
})
