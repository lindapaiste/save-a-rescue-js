import React from 'react';
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {SearchRoute} from "./search-results/SearchPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PetProfile} from "./single-pet/PetProfile";
import {BreedResultsFromId} from "./search-results/BreedResults";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter
                    basename="/adoptable-dogs-cats"
                >
                    <Switch>
                        <Route path="/pet/:id" render={({match}) => <PetProfile id={match.params.id}/>}/>
                        <Route path="/breed/:id" render={({match}) => <BreedResultsFromId id={match.params.id}/>}/>
                        <Route path="/" component={SearchRoute}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
