import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import Landing from './Component/Landing'; // eslint-disable-line
import Results from './Component/Results'; // eslint-disable-line
import 'react-day-picker/lib/style.css';
import '../assets/react-day-override.css';

// eslint-disable-next-line
injectGlobal`
    html {
        font-family: 'Nunito', sans-serif;
    }
`;


class App extends Component { // eslint-disable-line
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                      exact
                      path="/"
                      render={props => (
                          <Landing
                            {...props}
                          />
                      )}
                    />
                    <Route
                      exact
                      path="/results/:originPortId/:destinationPortId/:from/:to"
                      render={props => (
                          <Results
                            {...props}
                          />
                      )}
                    />
                </Switch>
            </Router>
        );
    }
}
render(<App />, document.getElementById('root'));
