import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Landing from '../../../../../Landing/Index';
import SelectPorts from '../../../../SelectPorts/Index'

import { render, fireEvent, cleanup } from 'react-testing-library';

import sinon from 'sinon';
import axios from 'axios';
import Dropdown from '../Index';
import { WAIT_MILLISECONDS } from "../../../../../../Util";
import { BASE_URL } from "../../../../../../CONSTANT";
import Adapter from "enzyme-adapter-react-16/build/index";
configure({adapter : new Adapter()});

let sandbox;
let server;

beforeEach(() => {
    sandbox = sinon.createFakeServer();
    server = sinon.useFakeServer();
});

afterEach(() => {
    sandbox.restore();
    server.restore();
    cleanup();
});

describe('<Dropdown/>', () => {
    it('should not hit the api as soon as the user starts typing', () => {
        const { getByPlaceholderText } = render((
            <Router>
                <Router>
                    <Landing>
                        <SelectPorts>
                            <Dropdown />
                        </SelectPorts>
                    </Landing>
                </Router>
            </Router>

        ));
        const axiosGetSpy = sinon.spy(axios, 'get');
        const inputNode = getByPlaceholderText('Origin Port');
        fireEvent.change(inputNode, { target: { value: 'o' } });
        expect(axiosGetSpy.called).toBe(false);
        axiosGetSpy.restore();
    });
    it(`should hit the api in a debounced way after ${WAIT_MILLISECONDS} milliseconds`, done => {
        const { getByPlaceholderText } = render((
            <Router>
                <Router>
                    <Landing>
                        <SelectPorts>
                            <Dropdown />
                        </SelectPorts>
                    </Landing>
                </Router>
            </Router>
        ));
        const axiosGetSpy = sinon.spy(axios, 'get');
        const inputNode = getByPlaceholderText('Origin Port');
        const INPUT_VALUE = 'osl';
        fireEvent.change(inputNode, { target: { value: INPUT_VALUE } });
        setTimeout(() => {
            expect(axiosGetSpy.args[0][0]).toBe(`${BASE_URL}/ports/search/${INPUT_VALUE}`);
            done();
        }, WAIT_MILLISECONDS*4);
    });
});
