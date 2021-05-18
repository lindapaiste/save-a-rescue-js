import { useCallback, useEffect, useMemo } from "react";
import { PartialSome } from "@lindapaiste/ts-helpers";
import { shouldFetchEntity } from "./selectors";
import {
  useEntitiesSelector,
  useSelector,
  useDispatch,
} from "../../store";
import { RgEntityIdentifier, RgEntityType } from "../schema/attributes";
import { RgRequest } from "../client/RgRequest";
import { RgClient } from "../client/RgClient";
import { loadCollection } from "../collections/load";
import { selectStatusByKey } from "../collections/selectors";

export interface FetchHook {
  isLoading: boolean;
  isError: boolean;
  error?: string;

  load(): void;
}

/**
 * All functions should gracefully handle empty id by NOT FETCHING
 */

/**
 * Only fetches conditionally based on redux state.
 *
 * Allow for id to be undefined to handle conditional loading of relationship entities.
 *
 * Returns the load function to be used as "retry" on errors.
 */
export const useRequireEntity = <T extends RgEntityType>({
  type,
  id = "",
}: PartialSome<RgEntityIdentifier<T>, "id">): FetchHook => {
  const shouldFetch =
    useEntitiesSelector(shouldFetchEntity({ type, id })) && !!id;

  const dispatch = useDispatch();

  const request = useMemo(() => {
    const path = `${RgClient.entityBase(type)}/${id}`;
    const req = new RgRequest(type, path);
    return req.raw();
  }, [type, id]);

  const load = useCallback(
    () => dispatch(loadCollection(request)),
    [dispatch, request]
  );

  const { status, error } = useSelector(selectStatusByKey(request.key));

  useEffect(() => {
    if (shouldFetch) {
      load();
    }
  }, [load, shouldFetch]);

  return {
    load,
    isLoading: status === "pending",
    isError: status === "rejected",
    error,
  };
};

export const useRequireAnimal = (id: string) =>
  useRequireEntity({ id, type: "animals" });
export const useRequireOrg = (id: string) =>
  useRequireEntity({ id, type: "orgs" });
