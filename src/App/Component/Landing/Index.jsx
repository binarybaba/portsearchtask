import React, { Component } from 'react';
import { debounce } from '../../Util';
import SelectPorts from './SelectPorts/Index';


class Landing extends Component {
    state = {
        foo: 'bar', // eslint-disable-line
    };

    search(input) { // eslint-disable-line
        if (input.length) {
            debounce(() => {
                console.log(input);
            });
        }
    }

    render() {
        return (
            <div>
                <SelectPorts />
            </div>
        );
    }
}

// const Landing = props => ;

export default Landing;
