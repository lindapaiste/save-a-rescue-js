import { RgCollection } from "./state";

/**
 * Flatten the ids from all pages into a single array.
 */
export const idsFromCollection = (
  collection?: RgCollection
): string[] | undefined => {
  return collection ? collection.ids.flat() : [];
};

export const isLoadedAll = (collection?: RgCollection): boolean => {
  if (!collection) return false;
  return collection.ids.length >= collection.meta.pages;
};

export const isLoadedPage = (
  collection: RgCollection | undefined,
  page: number
): boolean => {
  if (!collection) return false;
  return !!collection.ids[page - 1];
};

export const nextPageNumber = (collection?: RgCollection): number => {
  if (!collection) return 1;
  return collection.meta.pageReturned + 1;
};
