import React from "react";
import {isDirectorySlug, SearchFormProps} from "./types";

/**
 * can do an HTML form in the short-term, but eventually want an internal state
 */

export const SearchForm = ({slug, title, image, select, action, isBubble}: SearchFormProps) => {

    const isDirectory = isDirectorySlug(slug);

    return (
        <div className={`home-search ${isBubble ? "bubble" : "plain"} ${slug} center-contents`}>
            <h3>{title}</h3>
            <form
                id={`search-${slug}`}
                action={action}
                method="get"
                className="center-contents"
            >
                {isDirectory ?
                    <input type="hidden" name="directory_radius" value="2000"/>
                    :
                    <input type="hidden" name="pet" value={slug}/>
                }
                {!!image &&
                <img
                    {...image}
                    alt={slug}
                />
                }
                <label htmlFor={`${slug}-zip`} aria-hidden="true">
                    Zip/Postal Code
                </label>
                <input
                    id={`${slug}-zip`}
                    name="address"
                    autoComplete="postal-code"
                    type="text"
                    placeholder="Enter Your Zip Code"
                />
                {select}
                <button className="btn search-now search-btn" type="submit">Search Now</button>
            </form>
        </div>

    )
}
