import React, {useState} from "react";
import {Form, Input} from "antd";
import {normalizeZip} from "../../location/validation";

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
