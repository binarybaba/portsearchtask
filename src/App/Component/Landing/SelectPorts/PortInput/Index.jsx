import React from 'react';
import Dropdown from './Dropdown/Index';

const PortInput = (props) => {
    const {
        onChange,
        onClearSelection,
        onSelect,
        placeholder,
    } = props;
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
};

export default PortInput;
