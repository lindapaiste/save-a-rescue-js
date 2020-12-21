import {FetchHook} from "../connected/useRequireEntity";
import {Error} from "./Error";
import {Button} from "antd";
import React from "react";
import SyncOutlined from "@ant-design/icons/SyncOutlined";
import {AxiosError} from "axios";
import {RgErrorResponseBody} from "../clientRg/response";
import {isNullOrUndefined} from "util";

/**
 * error from fetching includes a `Retry` button
 */
export const FetchError = ({error, load, title}: Pick<FetchHook, 'error' | 'load'> & {title?: string}) => {
    return (
        <Error
            title={title}
            message={extractMessage(error)}
        >
            <Button icon={<SyncOutlined/>} onClick={load}>Retry</Button>
        </Error>
    )
}

export const extractMessage = (error: any): string | undefined => {
    if ( ! error ) {
        return undefined;
    }
    if ( isRgAxiosError(error) ) {
        const array = error?.response?.data?.errors;
        if ( array?.length ) {
            return array[0].detail;
        }
    }
    if ("message" in error) {
        return error.message.toString();
    } else if (typeof error === "string") {
        return error;
    }
}

const isRgAxiosError = (error: any): error is AxiosError<RgErrorResponseBody> => {
    //using try/catch because malformed errors were throwing all sorts of things
    try {
        return (typeof error === "object" && "response" in error && "data" in error.response && "errors" in error.response.data);
    } catch (e) {
        return false;
    }
}
