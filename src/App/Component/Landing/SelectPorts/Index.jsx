import React, { Component } from 'react'; // eslint-disable-line
import Origin from './Origin/Index';
import Destination from './Destination/Index';

class SelectPorts extends Component { // eslint-disable-line
    state = {};

    render() {
        // const { search } = this.props;
        const { origin, destination } = this.state;
        return (
            <form>
                <Origin />
                <Destination />
                <button type="submit" disabled={(!origin && !destination)}>Go</button>
            </form>
        );
    }
}

export default SelectPorts;
