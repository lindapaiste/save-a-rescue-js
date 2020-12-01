import React from "react";
import {Select} from 'antd';
import {SelectProps} from "antd/lib/select";

/**
 * in order to work inside form validation, should not require value
 * use onChange instead of setValue
 * basically all I am doing here is setting a few default props
 *
 * previously had allowClear=true, but the clear x takes the place of the expand arrow
 */

/**
 * icons: clearIcon, menuItemSelectedIcon, removeIcon, suffixIcon
 */

export const MultiSelect = <T extends string | number = string>({placeholder = "Any", allowClear = false, showArrow = true, style, ...props}: SelectProps<T>) => {
    return (
        <Select
            mode="multiple"
            allowClear={allowClear}
            showArrow={showArrow}
            placeholder={placeholder}
            filterOption={(input, option) =>
                option?.label ? option.label.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
            {...props}
        />
    )
}
