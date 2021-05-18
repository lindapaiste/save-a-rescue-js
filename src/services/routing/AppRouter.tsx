import { Route, Switch } from "react-router-dom";
import React from "react";
import { PetProfile } from "../../components/single-pet/PetProfile";
import { SearchRoute } from "../../components/search-results/SearchPage";
import Dalmatian from "../../components/breed-page/BreedPage";
import { Home } from "../../components/home/Home";
import { PATHS } from "./paths";

export const AppRouter = () => (
  <Switch>
    <Route
      path={PATHS.petProfile(":id")}
      render={({ match }) => <PetProfile id={match.params.id} />}
    />
    <Route path="/breed/dalmatian/:tab" component={Dalmatian} />
    <Route path="/breed/dalmatian" component={Dalmatian} />
    <Route path={PATHS.search()} component={SearchRoute} />
    <Route component={Home} />
  </Switch>
);
