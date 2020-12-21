import React from 'react';
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {AppRouter} from "./routing/AppRouter";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </div>
    );
}

export default App;
