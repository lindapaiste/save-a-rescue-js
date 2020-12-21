import React, {createRef, useCallback, useMemo, useState} from "react";
import {useOnClickOutside} from "../../util/useOnClickOutside";
import {addClass} from "../../util/misc";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import DownOutlined from "@ant-design/icons/DownOutlined";

interface Option<T = string> {
    value: T;
    label: string;
    disabled?: boolean;
}

const createOptions = (count: number): Option[] => {
    const options: Option<string>[] = [];
    for (let i = 0; i < 1000; i++) {
        const value = `${i.toString(36)}${i}`;
        options.push({
            value,
            label: value,
            disabled: i === 10
        });
    }
    return options;
}


export const MyMultiSelect = () => {
    const [selected, setSelected] = useState<Option<string>[]>([]);

    const selectRef = createRef<HTMLSelectElement>();
    const wholeAreaRef = createRef<HTMLDivElement>();

    const [open, setOpen] = useState(false);

    console.log(selected);

    const isSelected = (value: string): boolean => selected.some(o => o.value === value);

    const select = (option: Option) => {
        console.log(`selecting ${option.label}`);
        setSelected((current) => [...current, option]);
    };

    const deselect = (option: Option) => {
        console.log(`deselecting ${option.label}`);
        setSelected((current) => current.filter((v) => v.value !== option.value));
    };

    const toggleSelected = (option: Option) => {
        if (isSelected(option.value)) {
            deselect(option);
        } else {
            select(option);
        }
    };

    const options = useMemo(() => createOptions(10), []);

    const onClickInput = () => {
        if (open) {
            console.log("unfocusing", selectRef.current);
            selectRef.current?.blur();
            setOpen(false);
        } else {
            console.log("focusing", selectRef.current);
            selectRef.current?.focus();
            setOpen(true);
        }
    }

    const onClickOutside = useCallback(() => {
        console.log("unfocusing", selectRef.current);
        selectRef.current?.blur();
        setOpen(false);
    }, [selectRef]);
    // Mutable values like 'selectRef.current' aren't valid dependencies because mutating them doesn't re-render the
    // component


    useOnClickOutside(wholeAreaRef, onClickOutside);

    return (
        <div>
            <div ref={wholeAreaRef} className={addClass("my-select", open ? "open" : "closed")}>
                <div
                    className="ant-form-item-control-input-content my-select-input"
                    onClick={onClickInput}
                >
                    <div
                        className={addClass("ant-select ant-select-multiple ant-select-show-arrow ant-select-show-search", open ? "ant-select-open" : "")}
                    >
                        <ul className="my-select-selected">
                            {selected.map((option) => (
                                <li className="ant-select-selection-item" key={option.value}>
                                    <span className="ant-select-selection-item-content">{option.label}</span>
                                    <span className="ant-select-selection-item-remove" unselectable="on"
                                          aria-hidden="true"
                                          onClick={() => deselect(option)}>
                            <CloseOutlined/>
                        </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <span>
                    {open ? <CloseOutlined/> : <DownOutlined/>}
                </span>
                </div>
                <select
                    ref={selectRef}
                    multiple={true}
                    className={addClass("my-select-select multiple ant-select-multiple", open ? "open" : "closed")}
                    value={selected.map(o => o.value)}
                    /*onChange={(e) =>
                      setSelected([...e.currentTarget.selectedOptions].map((o) => o.value))
                    }*/
                >
                    {options.map((option) => (
                        <option value={option.value} onClick={() => toggleSelected(option)}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <select
                multiple={false}
                className="my-select single"
            >
                {options.map(({value, label}) => (
                    <option value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};
