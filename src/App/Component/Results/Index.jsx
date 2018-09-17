import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chart from './Chart/Index';
import { Logo } from '../Landing/Styled/Components';
import { getPortDetails } from './Api';
import { timeStampToISO } from './Util';
import Dates from './Dates/Index';

import {
    Wrapper,
    Navbar,
    ResultsWrapper,
    GraphWrapper,
    HeadingWrapper,
    SubtleText,
} from './Styled/Components';
import DatePreview from './DatePreview/Index';
import EditablePortNames from './EditablePortNames/Index';
import { searchPort } from '../../API';

class Results extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired, // eslint-disable-line
        match: PropTypes.object.isRequired, // eslint-disable-line
        location: PropTypes.object.isRequired, // eslint-disable-line
    };
    static searchForPorts(query) { // eslint-disable-line
        if (query.length) {
            return searchPort(query);
        }
    }

    state = {
        userIsTyping: false,
    };

    componentDidMount() {
        this.setInitialState();
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.setInitialState();
        }
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

    handlePortChange(searchKey) {
        this.setState(() => ({ userIsTyping: true }));
        return Results.searchForPorts(searchKey);
    }

    handleOriginPortSelect(originPort) {
        const {
            destinationPort,
            from,
            to,
        } = this.state;
        const { history } = this.props;
        this.setState(() => ({ originPort, userIsTyping: false }));
        history.push(`/results/${originPort.id}/${destinationPort.id}/${from}/${to}`);
    }

    handleDestinationPortSelect(destinationPort) {
        const {
            originPort,
            from,
            to,
        } = this.state;
        const { history } = this.props;
        this.setState(() => ({ destinationPort, userIsTyping: false }));
        history.push(`/results/${originPort.id}/${destinationPort.id}/${from}/${to}`);
    }

    /*
    * Sets the initial state ie port, destination, from and to.
    * */
    setInitialState() {
        const { match } = this.props;
        const { params } = match;
        const {
            originPortId,
            destinationPortId,
            from,
            to,
        } = params;
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
                                onSelectDestinationPort={
                                    this.handleDestinationPortSelect.bind(this)
                                }
                            />
                            <SubtleText
                                userIsTyping={userIsTyping}
                            >
                                Click on the port names and type to change
                            </SubtleText>
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
