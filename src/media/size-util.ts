import {Size} from "./types";

export const toHeight = (height: number) => <T extends Size>(props: T): T => ({
    ...props,
    height,
    width: props.width * height / props.height,
});
