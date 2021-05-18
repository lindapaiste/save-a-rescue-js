export interface LatLon {
  lat: number;
  lon: number;
}

/**
 * all possible values about a location
 */
export interface UserLocation {
  lat: number;
  lon: number;
  coords: string;
  zip: string;
  city: string;
  stateName: string;
  stateCode: string;
  countryName: string;
  countryCode: string;
}

/**
 * a valid location is one that has a valid zip, both lat and lon, or coords
 */
export type ValidLocation =
  | LatLon
  | Pick<UserLocation, "coords">
  | Pick<UserLocation, "zip">;
export type ValidUserLocation = Partial<UserLocation> & ValidLocation;
