import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as CONSTANT from '../../CONSTANT';
import SelectPorts from './SelectPorts/Index';
import { searchPort } from '../../API';
import { Navbar, Logo, Map } from './Styled/Components';


class Landing extends Component {
    static searchForPorts(query) {
        if (query.length) {
            return searchPort(query);
        }
        return null;
    }

    state = {};

    handleOriginPortChange(searchKey) { // eslint-disable-line
        return Landing.searchForPorts(searchKey);
    }

    handleOriginPortClear() {
        this.setState(() => ({ originPort: null }));
    }

    handleOriginPortSelect(originPort) {
        this.setState(() => ({ originPort }));
    }

    handleDestinationPortChange(searchKey) { // eslint-disable-line
        return Landing.searchForPorts(searchKey);
    }

    handleDestinationPortClear() {
        this.setState(() => ({ destinationPort: null }));
    }

    handleDestinationPortSelect(destinationPort) {
        this.setState(() => ({ destinationPort }));
    }

    handleGoForward(e) {
        e.preventDefault();
        const { originPort, destinationPort } = this.state;
        const { DEFAULT_FROM_DATE, DEFAULT_TO_DATE } = CONSTANT;
        const { history } = this.props;
        history.push(`/results/${originPort.id}/${destinationPort.id}/${DEFAULT_FROM_DATE}/${DEFAULT_TO_DATE}`);
    }

    render() {
        const { originPort, destinationPort } = this.state;
        const enableGo = (!!originPort && !!destinationPort);
        return (
            <div>
                <Navbar>
                    <Link to="/" href="/">
                        <Logo />
                    </Link>
                </Navbar>
                <Map />
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

export default Landing;
