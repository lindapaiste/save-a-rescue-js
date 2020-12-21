import {RefObject, useEffect} from "react";

/**
 * https://usehooks.com/useOnClickOutside/
 *
 * Should wrap handler in useCallback for performance
 *
 * Doesn't make sense to make dependent on a generic element T because the element for the ref is different from the
 * handler.  The handler should work with any element because it is attached to the whole document.
 */
export const useOnClickOutside = (ref: RefObject<Element>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(
        () => {
            const listener = (event: MouseEvent | TouchEvent) => {
                // Do nothing if clicking ref's element or descendent elements
                // type casting is required:
                // https://stackoverflow.com/questions/43842057/detect-if-click-was-inside-react-component-or-not-in-typescript
                if (!ref.current || (event.target && ref.current.contains(event.target as Node))) {
                    return;
                }

                console.log(ref.current, event.target);

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}
