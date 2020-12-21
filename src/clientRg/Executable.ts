import {RgEntityType} from "./attributes";
import {RgResponseBody} from "./response";
import {RgRequestArgs} from "./RgClient";

export interface KeyedExecutable<T> {
    key: string;
    execute(): Promise<T>
}

export interface Executer {
    request<T extends RgEntityType>({url, params, data, method}: RgRequestArgs): Promise<RgResponseBody<T>>
}

export class Executable {

}
