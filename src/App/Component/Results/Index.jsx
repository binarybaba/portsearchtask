import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chart from './Chart/Index';
import { Logo } from '../Landing/Styled/Components';
import { getPortDetails } from './Api';
import { timeStampToISO, stringDateToHuman } from './Util';
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

class Results extends Component { // eslint-disable-line

    static propTypes = {
        history: PropTypes.object.isRequired, // eslint-disable-line
        match: PropTypes.object.isRequired, // eslint-disable-line
        location: PropTypes.object.isRequired, // eslint-disable-line
    };

    state = {};

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

    componentDidUpdate() {
        console.log('updated', this.props);
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
                            <Heading>
                                <h1>{`${originPort.name} to ${destinationPort.name}`}</h1>
                                <small>{`Showing freight rates from ${stringDateToHuman(from)} to ${stringDateToHuman(to)}`}</small>
                            </Heading>
                        </HeadingWrapper>
                        <GraphWrapper>
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
