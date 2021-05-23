import { Redirect, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import { Spin } from "antd";
import { Home } from "../../components/home/Home";
import { PATHS } from "./paths";

const PageLoading = () => (
  <div className="full-size center-contents">
    <Spin size="large" />
  </div>
);

const Dalmatian = React.lazy(
  () => import("../../components/breed-page/BreedPage")
);

const Search = React.lazy(
  () => import("../../components/search-results/SearchPage")
);

const PetProfile = React.lazy(
  () => import("../../components/single-pet/PetProfile")
);

export const AppRouter = () => (
  <Suspense fallback={PageLoading}>
    <Switch>
      <Route path={PATHS.petProfile(":id")} component={PetProfile} />
      <Route path="/breed/dalmatian/:tab" component={Dalmatian} />
      <Route path="/breed/dalmatian" component={Dalmatian} />
      <Route path="/breed" render={() => <Redirect to="/breed/dalmatian" />} />
      <Route path={PATHS.search()} component={Search} />
      <Route component={Home} />
    </Switch>
  </Suspense>
);
