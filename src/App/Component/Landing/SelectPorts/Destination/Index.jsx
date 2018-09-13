import React, { Component } from 'react';
import Dropdown from '../../../shared/Dropdown/Index';

class Destination extends Component { // eslint-disable-line
    render() {
        const { onChange, onClearSelection, onSelect } = this.props;
        return (
            <div>
                destination port
                <Dropdown
                    onChange={onChange}
                    onClearSelection={onClearSelection}
                    onSelect={onSelect}
                />
            </div>
        );
    }
}

export default Destination;
