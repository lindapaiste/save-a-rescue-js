# Pet Search

View the current version at [pets.lindapaiste.com](https://pets.lindapaiste.com/).

This code was initially created for [savearescue.org](https://savearescue.org/adoptable-dogs-cats) to power their adoptable dog and cat search.

---

# Stack

## Build
 - Created with `Create React App`
 - Hosted on `Vercel`
 - `craco` used on top of `react-scripts` in order to support custom `.less` stylesheet variables

## Packages
 - UI with `antd`
 - Carousels with `react-slick`
 - Navigation with `react-router`
 - API fetching with `axios`
 - State management with `redux`
   - Reducers and `thunk` actions created with `@reduxjs/toolkit`
   - Connected to React with `react-redux`
 - Text parsing with `he`
 - Query string parsing with `qs`
 - Basic utilities from `lodash`

## External APIs
 - All pet data from [`RescueGroups.org`](https://api.rescuegroups.org/v5/public/docs#start-here) v5 REST JSON API.
   - Uses both `GET` and `POST` requests, where `POST` requests are used for passing complex search filters.
 - Estimated user location from [`IPLocate.io`](https://www.iplocate.io/).
   - I built a more accurate "use my current location" button with the web [`Geolocation API`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), but the client didn't like this and preferred for users to enter a zip code.