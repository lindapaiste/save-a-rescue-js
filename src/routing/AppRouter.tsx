import {BrowserRouter, Route, RouteProps, Switch, match} from "react-router-dom";
import {PetProfile} from "../single-pet/PetProfile";
import {BreedResultsFromId} from "../search-results/BreedResults";
import {SearchRoute} from "../search-results/SearchPage";
import Dalmatian from "../breed-page/BreedPage";
import React from "react";
import {RGOrgProfile} from "../rescue-page/RGOrgPage";
import {RouteChildrenProps, RouteComponentProps} from "react-router";
import {Home} from "../home/Home";

/**
 * can add custom info here
 */
export interface RouteDefinition<Params extends { [K in keyof Params]?: string } = {}> extends RouteProps {

    createCanonical?: (url: string, params: Params) => string;

    //refine based on params
    component?: React.ComponentType<RouteComponentProps<Params>> | React.ComponentType<Params>;
    render?: (props: RouteComponentProps<Params>) => React.ReactNode;
    children?: ((props: RouteChildrenProps<Params>) => React.ReactNode) | React.ReactNode;
}

export const ROUTES: RouteDefinition[] = [

]


export const AppRouter = () => (
    <BrowserRouter
        //                    basename="/adoptable-dogs-cats"
    >
        <Switch>
            <Route path="/adoptable-dogs-cats/pet/:id" render={({match}) => <PetProfile id={match.params.id}/>}/>
            <Route path="/adoptable-dogs-cats/breed/:id"
                   render={({match}) => <BreedResultsFromId id={match.params.id}/>}/>
            <Route path="/adoptable-dogs-cats" component={SearchRoute}/>
            <Route path="/breed/:slug/:tab" component={Dalmatian}/>
            <Route path="/breed/:slug" component={Dalmatian}/>
            <Route path="/org/:id" render={({match}) => <RGOrgProfile id={match.params.id}/>}/>
            <Route path="/" component={Home}/>
        </Switch>
    </BrowserRouter>
)
