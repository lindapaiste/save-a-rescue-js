import axios from "axios";
import { fetchIpLocation } from "./ipLocate";

describe("iplocate", () => {
  it("throws an error if there is no location", async () => {
    const invalid = "https://www.iplocate.io/api/lookup/8.8.8.889";
    expect.assertions(1);
    await expect(axios.get(invalid)).rejects.toBeTruthy();
  });

  it("estimates a lat and lon", async () => {
    expect.assertions(2);
    const loc = await fetchIpLocation();
    expect(loc.lat).toBeDefined();
    expect(loc.lon).toBeDefined();
  });
});
