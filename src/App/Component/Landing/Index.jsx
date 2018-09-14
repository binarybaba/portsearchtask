import React, { Component } from 'react';
import * as CONSTANT from '../../CONSTANT';
import SelectPorts from './SelectPorts/Index';
import { searchPort } from '../../API';


class Landing extends Component {
    state = {};

    handleOriginPortChange(searchKey) {
        return this.searchForPorts(searchKey);
    }

    handleOriginPortClear() { // eslint-disable-line
        this.setState(() => ({ originPort: null }));
    }

    handleOriginPortSelect(originPort) { // eslint-disable-line
        this.setState(() => ({ originPort }));
    }

    handleDestinationPortChange(searchKey) {
        return this.searchForPorts(searchKey);
    }

    handleDestinationPortClear() { // eslint-disable-line
        this.setState(() => ({ destinationPort: null }));
    }

    handleDestinationPortSelect(destinationPort) { // eslint-disable-line
        this.setState(() => ({ destinationPort }));
    }

    handleGoForward(e) {
        e.preventDefault();
        const { originPort, destinationPort } = this.state;
        const { DEFAULT_FROM_DATE, DEFAULT_TO_DATE } = CONSTANT;
        const { history } = this.props;
        history.push(`/results/${originPort.id}/${destinationPort.id}/${DEFAULT_FROM_DATE}/${DEFAULT_TO_DATE}`);
    }

    searchForPorts(query) { // eslint-disable-line
        if (query.length) {
            return searchPort(query);
        }
    }

    render() {
        const { originPort, destinationPort } = this.state;
        const enableGo = (!!originPort && !!destinationPort);
        return (
            <div>
                <SelectPorts
                    handleOriginPortChange={this.handleOriginPortChange.bind(this)}
                    handleOriginPortClear={this.handleOriginPortClear.bind(this)}
                    handleOriginPortSelect={this.handleOriginPortSelect.bind(this)}
                    handleDestinationPortChange={this.handleDestinationPortChange.bind(this)}
                    handleDestinationPortClear={this.handleDestinationPortClear.bind(this)}
                    handleDestinationPortSelect={this.handleDestinationPortSelect.bind(this)}
                    enableGo={enableGo}
                    handleGoForward={this.handleGoForward.bind(this)}
                />
            </div>
        );
    }
}

// const Landing = props => ;

export default Landing;
