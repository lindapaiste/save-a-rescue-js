import {breedsKey, DogOrCat} from "../strings/species";
import {useEffect, useState} from "react";
import {useSelector} from "../redux/store";
import {getAllBreeds} from "../redux/rgSelectors";
import {useDispatch} from "react-redux";
import {rgCollectionsSlice} from "../redux/rgCollections";
import {client} from "../clientRg";

/**
 * hook to load individual species breeds
 */
export const useBreeds = (species: DogOrCat) => {

    const [isLoading, setIsLoading] = useState(true);

    const breeds = useSelector(getAllBreeds(species));
    //console.log(breeds.map(breed => breed.value + '\t' + breed.label ).join('\n'))

    const shouldLoad = !breeds.length;

    const dispatch = useDispatch();

    useEffect(() => {
        const requestBreeds = async () => {
            setIsLoading(true);
            /**
             * can handle the sorted in the API call or before storing
             */
            const response = await client.getBreeds(species);
            dispatch(rgCollectionsSlice.actions.receiveCollection({
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
