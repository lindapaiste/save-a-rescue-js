import {breedsKey, DogOrCat} from "../strings/species";
import {useEffect, useState} from "react";
import {useSelector} from "../redux/store";
import {getAllBreeds} from "../redux/selectors";
import {useDispatch} from "react-redux";
import {collectionsSlice} from "../redux/collections";
import {client} from "../client";

/**
 * hook to load individual species breeds
 */
export const useBreeds = (species: DogOrCat) => {

    const [isLoading, setIsLoading] = useState(true);

    const breeds = useSelector(getAllBreeds(species));

    const shouldLoad = !breeds.length;

    const dispatch = useDispatch();

    useEffect(() => {
        const requestBreeds = async () => {
            setIsLoading(true);
            const response = await client.getBreeds(species);
            dispatch(collectionsSlice.actions.receiveCollection({
                response,
                type: 'breeds',
                key: breedsKey(species)
            }));
            setIsLoading(false);
            //TODO: handle error
        }

        if (shouldLoad) {
            requestBreeds();
        }
    }, [shouldLoad, species]);

    return {
        breeds,
        isLoading: isLoading && ! breeds.length,
        species,
    };
}
