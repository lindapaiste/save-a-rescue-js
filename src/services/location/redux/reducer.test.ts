import { nanoid } from "@reduxjs/toolkit";
import { createStore } from "../../store";
import { loadGeoLocation, loadIpLocation, receiveZip } from "./actions";

/**
 * First, just test the reducer itself by dispatching individual actions.
 * For example, dispatch 'pending' and 'rejected' actions directly
 * instead of through the thunk.
 *
 * Then, test that async thunk actions can be called.
 */
describe("location state", () => {
  let store = createStore();

  // Recreate the store before each test so that they are independent.
  beforeEach(() => {
    store = createStore();
  });

  it("can set a zip", () => {
    store.dispatch(receiveZip("03079", "input"));
    const { history } = store.getState().location;
    expect(history[0].zip).toBe("03079");
    expect(history[0].source).toBe("input");
    expect(history).toHaveLength(1);
  });

  it("can handle all three states of a thunk", () => {
    expect(store.getState().location.history).toHaveLength(0);

    // pending
    // Note: first argument is the request id, next is the args
    const beginPending = (id: string) => {
      store.dispatch(loadGeoLocation.pending(id));
      const status = store.getState().location.status.geo;
      expect(status.error).toBeUndefined();
      expect(status.isLoading).toBe(true);
      expect(status.didAttempt).toBe(true);
    };

    // pending then resolved
    let id = nanoid();
    beginPending(id);
    expect(store.getState().location.history).toHaveLength(0);
    const timestamp = Date.now();
    store.dispatch(
      loadGeoLocation.fulfilled(
        { timestamp, lat: 1234, lon: 5678, source: "geo" },
        id
      )
    );
    expect(store.getState().location.history).toHaveLength(1);
    expect(store.getState().location.history[0].lat).toBe(1234);
    let status = store.getState().location.status.geo;
    expect(status.error).toBeUndefined();
    expect(status.isLoading).toBe(false);
    expect(status.didAttempt).toBe(true);

    // pending then rejected
    id = nanoid();
    beginPending(id);
    store.dispatch(loadGeoLocation.rejected(new Error("message"), id));
    status = store.getState().location.status.geo;
    expect(status.error).toBe("message");
    expect(status.isLoading).toBe(false);
    expect(status.didAttempt).toBe(true);
  });

  it("can dispatch thunks asynchronously", async () => {
    expect.assertions(2);
    await store.dispatch(loadIpLocation());
    const latest = store.getState().location.history[0];
    expect(latest.lat).toBeDefined();
    expect(latest.source).toBe("ip");
  });
});
