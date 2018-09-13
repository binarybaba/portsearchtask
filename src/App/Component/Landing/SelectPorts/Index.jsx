import React, { Component } from 'react'; // eslint-disable-line
import Origin from './Origin/Index';
import Destination from './Destination/Index';

class SelectPorts extends Component { // eslint-disable-line
    state = {};

    render() {
        const {
            handleOriginPortChange,
            handleOriginPortClear,
            handleOriginPortSelect,
            handleDestinationPortChange,
            handleDestinationPortClear,
            handleDestinationPortSelect,
            enableGo,
            handleGoForward,
        } = this.props;
        return (
            <form>
                <Origin
                    onChange={handleOriginPortChange}
                    onSelect={handleOriginPortSelect}
                    onClearSelection={handleOriginPortClear}
                />
                <Destination
                    onChange={handleDestinationPortChange}
                    onSelect={handleDestinationPortSelect}
                    onClearSelection={handleDestinationPortClear}
                />
                <button
                    type="submit"
                    disabled={!enableGo}
                    onClick={e => handleGoForward(e)}
                >
                    Go
                </button>
            </form>
        );
    }
}

export default SelectPorts;
