import axios, {AxiosInstance} from "axios";
import {RescueOrg} from "./types";

export class Client {

    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://savearescue.org/wp-json/sar/v1/rescue',
        });
    }

    async fromSlug(slug: string): Promise<RescueOrg> {
        return axios.get(`/?slug=${slug}`);
    }

    async fromId(id: number | string): Promise<RescueOrg> {
        return axios.get(`/${id}`);
    }
}
