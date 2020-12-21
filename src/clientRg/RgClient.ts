import axios, {AxiosInstance, AxiosRequestConfig, CancelTokenSource, Method} from "axios";
import {SearchFormState} from "../search-box/types";
import {RgRequestData, RgRequestParams} from "./request";
import {RgResponseBody} from "./response";
import {RgEntityType} from "./attributes";
import {breedsKey, DogOrCat} from "../strings/species";
import {SearchRequest} from "./SearchRequest";
import {KeyedExecutable} from "./Executable";

export interface RgRequestArgs {
    url: string;
    params?: RgRequestParams;
    data?: RgRequestData;
    method?: Method;
}

export class RgClient {

    private readonly axiosInstance: AxiosInstance;

    private searchCancelToken: CancelTokenSource;

    private isSearching: boolean = false;

    constructor(private readonly apiKey: string) {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.rescuegroups.org/v5/public',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/vnd.api+json'
            },
            method: "POST", // default method is post because of data passing
        });
        this.searchCancelToken = axios.CancelToken.source();
    }

    /**
     * helper method executes a request from a standard format
     */
    async request<T extends RgEntityType>({url, params, data, method}: RgRequestArgs, config?: AxiosRequestConfig): Promise<RgResponseBody<T>> {
        const res = await this.axiosInstance.request<RgResponseBody<T>>({
            ...config,
            url,
            params,
            method,
            data: data ? {data} : undefined,
        });
        return res.data;
    }

    /**
     * use cancel token to cancel previous search on args change
     */
    async search(args: Partial<SearchFormState>, page: number = 1): Promise<RgResponseBody<'animals'>> {
        if (this.isSearching) {
            //TODO: figure this out
            //console.log("already searching");
            //this.searchCancelToken.cancel("overwritten by new search");
        }
        this.isSearching = true;
        const request = new SearchRequest(args, page);
        const res = await this.request<'animals'>(request, {
            cancelToken: this.searchCancelToken.token,
        });
        this.isSearching = false;
        return res;
    }

    createSearchRequest(args: Partial<SearchFormState>, page: number = 1): KeyedExecutable<RgResponseBody<'animals'>> {
        const request = new SearchRequest(args, page);
        const execute = () => {
            return this.request<'animals'>(request);
        };
        return {
            key: request.key,
            execute,
        }
    }

    /**
     * breeds endpoint only supports GET method, so cannot use data property to filter.  Must instead use views, which
     * means dog and cat need to be fetched separately.
     */
    async getBreeds(species: DogOrCat): Promise<RgResponseBody<'breeds'>> {
        return await this.request<'breeds'>({
            url: breedsKey(species),
            method: 'GET',
            params: {
                limit: 10000, // breeds endpoint has no limit
                sort: 'breeds.name'
            }
        })
    }

    /**
     * Most entity paths start with `/animals`, like `/animals/breeds` or `animals/patterns`. Orgs is top-level as is
     * Animals itself.
     */
    private static entityBase(type: RgEntityType): string {
        switch (type) {
            case "orgs":
                return '/orgs';
            case "animals":
                return '/animals';
            default:
                return `/animals/${type}`;
        }
    }

    async getEntity<T extends RgEntityType>(type: T, id: string): Promise<RgResponseBody<T>> {
        const url = `${RgClient.entityBase(type)}/${id}`;
        return await this.request<T>({
            url,
            method: "GET",
        });
    }
}
