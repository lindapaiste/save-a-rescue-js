import {AttributeFilter, Operation} from "./request";
import {EntityAttributes, EntityType} from "./attributes";

export type FieldPair = {
    [K in EntityType]: {
        object: K;
        attribute: keyof EntityAttributes[K];
    }
}[keyof EntityAttributes]

type AttrWithId<T extends EntityType> = EntityAttributes[T] & {id: string};


/**
 * returns in a not strictly typed way, but enforces strict typing to create
 */
export const createFilter = <O extends EntityType, A extends keyof AttrWithId<O>>(object: O, attribute: A, value: AttrWithId<O>[A] | AttrWithId<O>[A][], operation: Operation = 'equal'): AttributeFilter => ({
    fieldName: `${object}.${attribute}`,
    operation,
    criteria: Array.isArray(value) ? value.length === 1 ? value[0].toString() : value.map(el => el.toString()) : value.toString(),
})
