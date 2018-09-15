import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from './Chart/Index';
import { getPortDetails } from './Api';
import { timeStampToISO } from './Util';
import Dates from './Dates/Index';

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

    // fetchRates() {
    //     const {
    //         originPort,
    //         destinationPort,
    //         from,
    //         to,
    //     } = this.state;
    //     this.setState(() => ({ renderingChart: true }));
    //     getRates({
    //         originPort,
    //         destinationPort,
    //         from,
    //         to,
    //     })
    //         .then((res) => {
    //             const { rates } = res.data;
    //             this.setState(() => ({ renderingChart: false, rates }));
    //         });
    // }

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
            <div>
                {!dateSelectorPropsResolved ? null : (
                    <Dates
                        from={from}
                        to={to}
                        setDateRange={this.setDateRange.bind(this)}
                    />
                )}
                { !chartPropsResolved ? null : (
                    <Chart
                        from={from}
                        to={to}
                        originPort={originPort}
                        destinationPort={destinationPort}
                    />
                )}

            </div>
        );
    }
}

export default Results;
