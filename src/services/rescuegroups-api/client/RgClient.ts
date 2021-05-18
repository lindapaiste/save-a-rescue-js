import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { RgResponseBody } from "../schema/response";
import { RgEntityType } from "../schema/attributes";
import { RgRequestArgs } from "./Executable";

/**
 * Client for executing API requests to rescuegroups.org
 */
export class RgClient {
  private readonly axiosInstance: AxiosInstance;

  // TODO: use cancel token to cancel previous search on args change
  private cancelToken: CancelTokenSource;

  /**
   * Create an instance from an API key.
   */
  constructor(private readonly apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: "https://api.rescuegroups.org/v5/public",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/vnd.api+json",
      },
    });
    this.cancelToken = axios.CancelToken.source();
  }

  /**
   * Helper method executes a request from a standard format.
   */
  async request<T extends RgEntityType>(
    { url, params, data, method }: RgRequestArgs,
    config?: AxiosRequestConfig
  ): Promise<RgResponseBody<T>> {
    const res = await this.axiosInstance.request<RgResponseBody<T>>({
      ...config,
      url,
      params,
      /**
       * use method if set, otherwise default to GET if no data or POST if data is present
       */
      method: method || (data ? "POST" : "GET"),
      data: data ? { data } : undefined,
    });
    return res.data;
  }

  /**
   * Most entity paths start with `/animals`, like `/animals/breeds` or `animals/patterns`.
   * Orgs is top-level as is Animals itself.
   */
  public static entityBase(type: RgEntityType): string {
    switch (type) {
      case "orgs":
        return "/orgs";
      case "animals":
        return "/animals";
      default:
        return `/animals/${type}`;
    }
  }

  /**
   * Max limit is 250 for most endpoints, but is 10000 for breeds and colors.
   */
  public static maxLimit(type: RgEntityType): number {
    return type === "breeds" || type === "colors" ? 10000 : 250;
  }
}
