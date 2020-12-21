import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {WpCollectionResponseBody, WpResponseFormatted, WpResponseObject} from "./response";
import {WpEntityType} from "./objects";

/**
 * for the wp/v2 namespace -- could support additional namespaces here or in a separate class
 */
export class WpClient {

    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://savearescue.org/wp-json/wp/v2/',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    async getCollection<T extends WpEntityType>(type: T, config: AxiosRequestConfig = {}): Promise<WpResponseFormatted<T>> {
        const res = await this.axiosInstance.get<WpCollectionResponseBody<T>>(
            '/' + type,
            config
        );
        return {
            entities: Object.values(res.data),
            headers: res.headers
        }
    }

    async getPosts(): Promise<WpResponseFormatted<'posts'>> {
        return this.getCollection('posts');
    }

    async getEntity<T extends WpEntityType>(type: T, id: string | number, config: AxiosRequestConfig = {}): Promise<WpResponseFormatted<T>> {
        const url = `/${type}/${id}`;
        const res = await this.axiosInstance.get<WpResponseObject<T>>(
            url,
            config
        );
        return {
            entities: [res.data],
            headers: res.headers
        }
    }
}
