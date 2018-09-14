import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chart from './Chart/Index';
import { getRates } from './Api';
import { toTimestampSeries } from './Util';

class Results extends Component { // eslint-disable-line

    state = {
        renderingChart: true,
    };

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const {
            originPortId,
            destinationPortId,
            fromDate,
            toDate,
        } = params;
        this.setRates({
            originPortId,
            destinationPortId,
            fromDate,
            toDate,
        });
    }

    setRates(filters) {
        this.setState(() => ({ renderingChart: true }));
        getRates(filters)
            .then((res) => {
                const rates = toTimestampSeries(res.data.rates);
                this.setState(() => ({ renderingChart: false, rates }));
            });
    }

    render() {
        const { rates, renderingChart } = this.state;
        return (
            <div>
                <h1>Results</h1>
                <Link to="/">Landing</Link>
                <Chart
                    series={rates}
                    loading={renderingChart}
                />
                <pre>
                    <code>
                        { JSON.stringify(this.props, null, 4) }
                    </code>
                </pre>
            </div>
        );
    }
}

export default Results;
