import React, { Component } from 'react';
import Dropdown from '../../../shared/Dropdown/Index';

class Origin extends Component { // eslint-disable-line
    render() {
        const { onChange, onClearSelection, onSelect } = this.props;
        return (
            <div>
                <p>Origin</p>
                <Dropdown
                    onChange={onChange}
                    onClearSelection={onClearSelection}
                    onSelect={onSelect}
                />
            </div>
        );
    }
}

export default Origin;
