import {SpeciesSlug} from "../../strings/species";
import {ReactNode} from "react";
import {ImageFile} from "../../media/types";

type DirectorySlug = 'services' | 'rescues';

export type SearchSlug = SpeciesSlug | DirectorySlug;

export const isDirectorySlug = (value: any) => {
    return value === 'services' || value === 'rescues';
}

export interface SearchFormProps {
    slug: SearchSlug;
    title: ReactNode;
    image?: ImageFile;
    select?: ReactNode;
    action?: string;
    isBubble: boolean;
}

export interface SearchTabProps {
    slug: SearchSlug;
    label: string;
    icon: ReactNode;
}

export type SearchBoxSchema = Omit<SearchFormProps, 'isBubble'> & SearchTabProps;
