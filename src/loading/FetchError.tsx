import {FetchHook} from "../connected/useRequireEntity";
import {Error} from "./Error";
import {Button} from "antd";
import React from "react";
import SyncOutlined from "@ant-design/icons/SyncOutlined";
import {AxiosError} from "axios";
import {ErrorResponseBody} from "../client/response";

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

const isRgAxiosError = (error: any): error is AxiosError<ErrorResponseBody> => {
    return ( "response" in error && "data" in error.response && "errors" in error.response.data );
}
