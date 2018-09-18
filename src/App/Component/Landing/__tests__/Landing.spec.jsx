import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

// import chai from 'chai';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import Landing from '../Index';
import SelectPorts from '../SelectPorts/Index';
import Dropdown from '../SelectPorts/PortInput/Dropdown/Index'

let sandbox;
let server;

configure({adapter : new Adapter()});

beforeEach(() => {
    sandbox = sinon.createFakeServer();
    server = sinon.useFakeServer();
});

afterEach(() => {
    sandbox.restore();
    server.restore();
});

describe('<Landing/>', () => {
    it('should mount', () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper).toBeDefined();
    });
    it('should have two Dropdowns', () => {
        const wrapper = mount((
            <Router>
                    <Route>
                        <Landing />
                    </Route>
            </Router>
        ));
        expect(wrapper.find(Dropdown).length).toBe(2);
    });
    it('should have one submit button', () => {
        const wrapper = mount((
            <Router>
                <Route>
                    <Landing />
                </Route>
            </Router>
        ));
        expect(wrapper.find(SelectPorts).find('button[type="submit"]').length).toBe(1);
    });
});



