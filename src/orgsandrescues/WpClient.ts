import axios, {AxiosInstance} from "axios";
import {RescueOrg} from "./types";

export class WpClient {

    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://savearescue.org/wp-json/sar/v1/rescues',
        });
    }

    async fromSlug(slug: string): Promise<RescueOrg> {
        const res = await this.axiosInstance.get<RescueOrg>('', {
            params: {
                slug,
            }
        });
        return res.data;
        //TODO: is an array or single?
    }

    async fromId(id: number | string): Promise<RescueOrg> {
        const res = await this.axiosInstance.get<RescueOrg>(`/${id}`);
        return res.data;
    }

    async breedRescues(slug: string): Promise<RescueOrg[]> {
        const res = await this.axiosInstance.get<RescueOrg[]>('', {
            params: {
                breed: slug,
            }
        });
        return res.data;
    }
}
