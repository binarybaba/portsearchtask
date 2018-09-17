import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import Landing from './Component/Landing/Index';
import Results from './Component/Results/Index';
import { BACKGROUND_COLOR, SUBTLE_BACKGROUND_COLOR } from './CONSTANT';
import 'react-day-picker/lib/style.css';

// eslint-disable-next-line
injectGlobal`
    html {
        font-family: 'Nunito', sans-serif;
        background-color: ${SUBTLE_BACKGROUND_COLOR}
    }
    background-color: ${BACKGROUND_COLOR};
`;


const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={props => <Landing {...props} />} />
            <Route exact path="/results/:originPortId/:destinationPortId/:from/:to" render={props => <Results {...props} />} />
        </Switch>
    </Router>
);

render(<App />, document.getElementById('root'));
