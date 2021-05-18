import { RgClient } from "./RgClient";

export const client = new RgClient(
  process.env.REACT_APP_RESCUE_GROUPS_API_KEY as string
);
