import { EffectCallback, useLayoutEffect } from "react";
import { debounce } from "lodash";

export const useResizeListener = (
  callback: EffectCallback,
  debounceMs = 100
) => {
  /**
   * if callback changes, does the old one stay when the new one is added?
   */

  useLayoutEffect(() => {
    const debouncedCallback = debounce(callback, debounceMs);

    window.addEventListener("resize", debouncedCallback);

    return () => window.removeEventListener("resize", debouncedCallback);
  }, [callback, debounceMs]);
};
