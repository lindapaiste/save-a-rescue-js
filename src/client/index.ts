import {Client} from "./Client";

export const client = new Client(process.env.REACT_APP_API_KEY as string);
