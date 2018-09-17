import React from 'react';
import PortInput from './PortInput/Index';
import { Form, PortField } from './Styled/Components';

const SelectPorts = (props) => {
        const {
            handleOriginPortChange,
            handleOriginPortClear,
            handleOriginPortSelect,
            handleDestinationPortChange,
            handleDestinationPortClear,
            handleDestinationPortSelect,
            enableGo,
            handleGoForward,
        } = props;
        return (
            <div>
                <Form>
                    <PortField>
                        <PortInput
                            onChange={handleOriginPortChange}
                            onSelect={handleOriginPortSelect}
                            onClearSelection={handleOriginPortClear}
                            placeholder="Origin Port"
                        />
                    </PortField>
                    <PortField destination>
                        <PortInput
                            onChange={handleDestinationPortChange}
                            onSelect={handleDestinationPortSelect}
                            onClearSelection={handleDestinationPortClear}
                            placeholder="Destination Port"
                        />
                    </PortField>
                    <button type="submit" disabled={!enableGo} onClick={e => handleGoForward(e)}>
                        <i className="fas fa-search fa-2x" />
                    </button>
                </Form>
            </div>
        );
};

export default SelectPorts;
