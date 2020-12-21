import {RgCollection} from "./rgCollections";

export const idsFromCollection = (collection?: RgCollection): string[] | undefined => {
    if (collection === undefined) return undefined;
    return Object.values(collection.ids).reduce((acc, curr) => acc.concat(...curr), [] as string[]);
}

export const isLoadedAll = (collection?: RgCollection): boolean => {
    if (!collection) return false;
    return (Object.keys(collection.ids).length >= collection.meta.pages);
}

export const isLoadedPage = (collection: RgCollection | undefined, page: number): boolean => {
    if (!collection) return false;
    return !!collection.ids[page - 1];
}

export const nextPageNumber = (collection?: RgCollection): number => {
    if (!collection) return 1;
    return collection.meta.pageReturned + 1;
}
