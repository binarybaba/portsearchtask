import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { generateConfig, toTimestampSeries } from './Util';
import { getRates } from './Api';


class Chart extends Component {
    static propTypes = {
        from: PropTypes.string.isRequired, // eslint-disable-line
        to: PropTypes.string.isRequired, // eslint-disable-line
        originPort: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
        }).isRequired,
        destinationPort: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
        }).isRequired,
    };

    state={
        fetching: true,
    };

    componentDidMount() { // eslint-disable-line
        this.fetchRates();
    }

    componentDidUpdate(prevProps) { // eslint-disable-line
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.fetchRates();
        }
    }

    fetchRates() {
        const {
            originPort,
            destinationPort,
            from,
            to,
        } = this.props;
        this.setState(() => ({
            fetching: true,
            originPort,
            destinationPort,
            from,
            to,
        }));
        getRates(originPort.id, destinationPort.id, from, to)
            .then(res => this.setState({ rates: toTimestampSeries(res.data.rates) }))
            .catch(() => this.setState({ fetchError: true })) // eslint-disable-line
            .then(() => this.setState({ fetching: false }));
    }

    render() {
        const {
            rates,
            fetching,
        } = this.state;
        const options = generateConfig(rates);
        return (
            <div style={{ width: '100%' }}>
                {fetching ? null : (
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        showLoading={fetching}
                    />
                )}
            </div>
        );
    }
}

export default Chart;
