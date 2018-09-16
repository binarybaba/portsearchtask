import React, { Component } from 'react'; // eslint-disable-line
import Origin from './Origin/Index';
import Destination from './Destination/Index';

import {
    Form,
    PortField,
} from './Styled/Components';

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
            <div>
                <Form>
                    <PortField>
                        <Origin
                            onChange={handleOriginPortChange}
                            onSelect={handleOriginPortSelect}
                            onClearSelection={handleOriginPortClear}
                            placeholder="Origin Port"
                        />
                    </PortField>
                    <PortField destination>
                        <Destination
                            onChange={handleDestinationPortChange}
                            onSelect={handleDestinationPortSelect}
                            onClearSelection={handleDestinationPortClear}
                            placeholder="Destination Port"
                        />
                    </PortField>
                    <button
                        type="submit"
                        disabled={!enableGo}
                        onClick={e => handleGoForward(e)}
                    >
                        <i className="fas fa-search fa-2x" />
                    </button>
                </Form>
            </div>
        );
    }
}

export default SelectPorts;
