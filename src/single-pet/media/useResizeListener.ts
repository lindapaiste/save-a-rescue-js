import {useLayoutEffect, EffectCallback} from "react";

export const useResizeListener = (callback: EffectCallback) => {
    /**
     * if callback changes, does the ond one stay when the new one is added?
     */

    useLayoutEffect( () => {
        window.addEventListener('resize', callback);

        return () => window.removeEventListener('resize', callback);
    }, [callback]);
}
