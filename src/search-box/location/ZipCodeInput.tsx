import React, {useState} from "react";
import {Form, Input} from "antd";

export interface Props {
    initialValue?: string;
    onValidChange: (zip: string) => void;
    onFocus?: () => void;
    placeholder?: string;
}

interface ZipState {
    entered: string;
    valid: boolean;
}

/**
 * from https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
 * zip looks like A1A 1A1, but wil special rules about disallowed characters
 */
const ca = new RegExp(/([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])[ -]?(\d[ABCEGHJ-NPRSTV-Z]\d)/i);
/**
 * matches 5 digit or 5 digit + 4, with or without hyphen
 * do not need start and end matchers because that is implied, if not using global '/g'
 */
const us = new RegExp(/^\d{5}(-?\d{4})?$/);

export const isValidZip = (zip: string): boolean => {
    return us.test(zip) || ca.test(zip);
};

/**
 * rescue groups API REQUIRES that there be a space in canadian zip codes
 * return a normalized zip or undefined if invalid
 */
export const normalizeZip = (zip: string): string | undefined => {
    if (us.test(zip)) {
        return zip;
    }
    const match = zip.match(ca);
    if (match) {
        // match[0] is the whole string, 1 and 2 are the two parts
        return `${match[1]} ${match[2]}`;
    }
}

export const ZipCodeInput = ({initialValue = "", onValidChange, onFocus, placeholder}: Props) => {

    /**
     * converts a zip code string into an object with a valid property
     */
    const toObject = (zip: string): ZipState => {
        const normalized = normalizeZip(zip);
        const valid = !! normalized;
        return {
                entered: normalized || zip,
                valid,
            }
    }

   /* const toObject = (zip: string): ZipState => {
        return {
            entered: zip,
            valid: isValidZip(zip),
        }
    }*/

    /**
     * store the state of the form locally, only updating to parent when valid
     * tbh could do that without component state
     */
    const [state, setState] = useState<ZipState>(toObject(initialValue));

    /**
     * handler sets local state and maybe updates parent, but only if valid
     */
    const handleChange = (zip: string) => {
        const obj = toObject(zip);
        setState(obj);
        if (obj.valid) {
            onValidChange(zip);
        }
    }

    /**
     * don't show error when nothing is entered
     */
    const validateStatus = state.entered ? (state.valid ? "success" : "error") : "";

    return (
        <Form.Item
            className="zip-code-input"
            validateStatus={validateStatus}
            hasFeedback
            //normalize={normalizeZip} not called
        >
            <Input
                placeholder={placeholder || "Enter Zip Code"}
                value={state.entered}
                onChange={e => handleChange(e.currentTarget.value)}
                onFocus={() => {
                    if (onFocus) {
                        onFocus();
                    }
                }}
            />
        </Form.Item>
    )
}
