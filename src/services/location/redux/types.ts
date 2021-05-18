import { ValidUserLocation } from "../types";

/**
 * Redux state combines all known locations for the user from various sources, including:
 * - url: A zip code extracted from a search url parameter.
 * - input: A zip code which was typed into a search form.
 * - ip: An estimated location from the user's ip address.
 * - geo: An accurate geolocation from the web GeoLocation API (requires permission).
 *
 * Can store zip code from previous searches, but they do need to enter it once.
 */

/**
 * All source types.
 */
export type LocSource = "input" | "geo" | "ip" | "url";

/**
 * Source types which involve asynchronous fetching.
 */
export type FetchableSource = "ip" | "geo";

/**
 * For fetchable sources, want to store the status.
 */
export interface ApiStatus {
  isLoading: boolean;
  didAttempt: boolean;
  error?: string;
}

/**
 * For every location result, want to store when it was received
 * and the source that it came from.
 */
export interface SourceTimestamp {
  timestamp: number;
  source: LocSource;
}

/**
 * The history is an array of LocHistoryItem objects which
 * contain the location and meta information.
 */
export type LocHistoryItem = ValidUserLocation & SourceTimestamp;

export interface LocationState {
  /**
   * The history of all known locations for this user.
   * NEWEST ITEMS FIRST.
   * This allows for easier use with `find()`, etc.
   */
  history: LocHistoryItem[];
  /**
   * A keyed object dictionary with the statuses
   * for all async fetchable sources.
   */
  status: Record<FetchableSource, ApiStatus>;
}
