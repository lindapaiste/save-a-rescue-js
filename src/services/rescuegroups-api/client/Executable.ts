import { Method } from "axios";
import { RgEntityType } from "../schema/attributes";
import { RgResponseBody } from "../schema/response";
import { RgRequestData, RgRequestParams } from "../schema/request";

/**
 * A serializable version of a RescueGroups API request.
 * Safe to use in a Redux action.
 */
export interface RgRequestArgs {
  url: string;
  params?: RgRequestParams;
  data?: RgRequestData;
  method?: Method;
}

export interface RgRequestAction {
  args: RgRequestArgs;
  type: RgEntityType;
  key: string;
}

/**
 * The core interface for a client
 * which is capable of executing requests.
 */
export interface RgExecuter {
  request<T extends RgEntityType>(
    args: RgRequestArgs
  ): Promise<RgResponseBody<T>>;
}
