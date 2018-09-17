/* eslint-disable */
import React, { Component } from 'react';
import Dropdown from './Dropdown/Index';
import { Heading } from '../Styled/Components';

class EditablePortNames extends Component {

    render() {
        const {
            originPort,
            destinationPort,
            onChangePort,
            onSelectOriginPort,
            onSelectDestinationPort,
        } = this.props;

        return (
            <div>
                <Heading>
                    <ul>
                        <li>
                            <Dropdown
                                onChange={onChangePort}
                                defaultSelectedItem={originPort}
                                onSelect={onSelectOriginPort}
                            />
                        </li>
                        <li><span>to</span></li>
                        <li>
                            <Dropdown
                                onChange={onChangePort}
                                defaultSelectedItem={destinationPort}
                                onSelect={onSelectDestinationPort}
                            />
                        </li>
                    </ul>
                </Heading>
            </div>
        );

    }
}
export default EditablePortNames;
