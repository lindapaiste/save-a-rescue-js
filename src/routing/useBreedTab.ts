import {useHistory, useParams} from "react-router-dom";
import {breedTab} from "./paths";

/**
 * sync the active tab to the url
 */

export interface BreedParams {
    slug: string;
    tab?: string;
}

export interface Returns {
    activeTab?: string;
    onChange?: (tab: string) => void;
}

export const useBreedTab = (): Returns => {
    //const pathname = useLocation();
    const {slug, tab = ""} = useParams<BreedParams>();
    const history = useHistory();
    return {
        activeTab: tab,
        onChange: (tab) => {
            history.push(breedTab(slug, tab))
        }
    }
}
