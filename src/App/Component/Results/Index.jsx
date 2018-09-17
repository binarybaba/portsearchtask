/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chart from './Chart/Index';
import { Logo } from '../Landing/Styled/Components';
import { getPortDetails } from './Api';
import { timeStampToISO, stringDateToHuman } from './Util';
import { SubtleText } from './Styled/Components';
import Dates from './Dates/Index';

import {
    Wrapper,
    Navbar,
    ResultsWrapper,
    GraphWrapper,
    HeadingWrapper,
    Heading,
} from './Styled/Components';
import DatePreview from './DatePreview/Index';
import EditablePortNames from './EditablePortNames/Index';
import { searchPort } from "../../API";

class Results extends Component { // eslint-disable-line

    static propTypes = {
        history: PropTypes.object.isRequired, // eslint-disable-line
        match: PropTypes.object.isRequired, // eslint-disable-line
        location: PropTypes.object.isRequired, // eslint-disable-line
    };

    state = {
        userIsTyping: false,
    };

    handlePortChange(searchKey) {
        this.setState(() => ({userIsTyping: true}));
        return this.searchForPorts(searchKey);
    }

    searchForPorts(query) { // eslint-disable-line
        if (query.length) {
            return searchPort(query);
        }
    }
    handleOriginPortSelect(originPort) {
        const {
            destinationPort,
            from,
            to,
        } = this.state;
        this.setState(() => ({ originPort, userIsTyping: false }));
        this.props.history.push(`/results/${originPort.id}/${destinationPort.id}/${from}/${to}`);
    }
    handleDestinationPortSelect(destinationPort) {
        const {
            originPort,
            from,
            to,
        } = this.state;
        this.setState(() => ({ destinationPort, userIsTyping: false }));
        this.props.history.push(`/results/${originPort.id}/${destinationPort.id}/${from}/${to}`);
    }


    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const {
            originPortId,
            destinationPortId,
            from,
            to,
        } = params;
        this.setInitialState(originPortId, destinationPortId, from, to);
    }

    componentDidUpdate(prevProps) {
        if(JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            const { match } = this.props;
            const { params } = match;
            const {
                originPortId,
                destinationPortId,
                from,
                to,
            } = params;
            this.setInitialState(originPortId, destinationPortId, from, to);
        }
    }

    setPorts(originPort, destinationPort) {
        this.setState(() => ({ originPort, destinationPort }));

    }

    setDateRange(range) {
        const from = timeStampToISO(range.from);
        const to = timeStampToISO(range.to);
        this.setState(() => ({ from, to }));
        const { history } = this.props;
        const {
            originPort,
            destinationPort,
        } = this.state;
        history.push(`/results/${originPort.id}/${destinationPort.id}/${from}/${to}`);
    }

    /*
    * Sets the initial state ie port, destination, from and to.
    * */
    setInitialState(originPortId, destinationPortId, from, to) {
        getPortDetails(originPortId)
            .then((originPortResponse) => {
                getPortDetails(destinationPortId)
                    .then(destinationPortResponse => this.setState(() => ({
                        originPort: originPortResponse.data,
                        destinationPort: destinationPortResponse.data,
                        from,
                        to,
                    })));
            });
    }

    render() {
        const {
            from,
            to,
            originPort,
            destinationPort,
            userIsTyping,
        } = this.state;
        const chartPropsResolved = (!!from && !!to && !!originPort && !!destinationPort);
        const dateSelectorPropsResolved = (!!from && !!to);
        return (
            <Wrapper>
                <Navbar>
                    <Link to="/" href="/">
                        <Logo />
                    </Link>
                    {!dateSelectorPropsResolved ? null : (
                        <DatePreview
                            from={from}
                            to={to}
                            render={() => (
                                <Dates
                                    from={from}
                                    to={to}
                                    setDateRange={this.setDateRange.bind(this)}
                                />
                            )}
                        />
                    )}
                </Navbar>
                { !chartPropsResolved ? null : (
                    <ResultsWrapper>
                        <HeadingWrapper>
                            <EditablePortNames
                                originPort={originPort}
                                destinationPort={destinationPort}
                                onChangePort={this.handlePortChange.bind(this)}
                                onSelectOriginPort={this.handleOriginPortSelect.bind(this)}
                                onSelectDestinationPort={this.handleDestinationPortSelect.bind(this)}
                            />
                            <SubtleText userIsTyping={userIsTyping}>Click on the port names and type to change</SubtleText>
                        </HeadingWrapper>
                        <GraphWrapper userIsTyping={userIsTyping}>
                            <Chart
                                from={from}
                                to={to}
                                originPort={originPort}
                                destinationPort={destinationPort}
                            />
                        </GraphWrapper>
                    </ResultsWrapper>
                )}
            </Wrapper>
        );
    }
}

export default Results;
