import {dateTime, TextRendered} from "../RestObject";

export interface WpCommentJson {
    id: number;
    post: number;
    parent?: number; //for nested child comments only
    author: number;
    author_name: string;
    author_url: string;
    date: dateTime;
    date_gmt: dateTime;
    content: TextRendered;
    link: string;
    status: string;
    type: string; //comment or pingback
    meta: {};
}

export type WpCommentEmbedded = Omit<WpCommentJson, 'post' | 'date_gmt' | 'status' | 'meta'>
