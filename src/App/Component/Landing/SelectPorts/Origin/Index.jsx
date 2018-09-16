import React, { Component } from 'react';
import Dropdown from '../../../shared/Dropdown/Index';

class Origin extends Component { // eslint-disable-line
    render() {
        const {
            onChange,
            onClearSelection,
            onSelect,
            placeholder,
        } = this.props;
        return (
            <div>
                <Dropdown
                    onChange={onChange}
                    onClearSelection={onClearSelection}
                    onSelect={onSelect}
                    placeholder={placeholder}
                />
            </div>
        );
    }
}

export default Origin;
