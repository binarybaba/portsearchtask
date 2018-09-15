import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { generateConfig, toTimestampSeries } from './Util';
import { getRates } from './Api';


class Chart extends Component { // eslint-disable-line

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

    fetchRates(originPort, destinationPort, from, to) { // eslint-disable-line
        this.setState(() => ({
            fetching: true,
            originPort,
            destinationPort,
            from,
            to,
        }));
        getRates(originPort.id, destinationPort.id, from, to)
            .then(res => this.setState({ rates: toTimestampSeries(res.data.rates) })) // eslint-disable-line
            .catch(() => this.setState({ fetchError: true })) // eslint-disable-line
            .then(() => this.setState({ fetching: false })); // eslint-disable-line
    }

    componentDidMount() { // eslint-disable-line
        const {
            originPort,
            destinationPort,
            from,
            to,
        } = this.props;
        this.fetchRates(originPort, destinationPort, from, to);
    }

    componentDidUpdate(prevProps) { // eslint-disable-line
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            const {
                originPort,
                destinationPort,
                from,
                to,
            } = this.props;
            this.fetchRates(originPort, destinationPort, from, to);
        }
    }

    render() {
        const {
            rates,
            fetching,
            originPort,
            destinationPort,
            from,
            to,
        } = this.state;
        const options = generateConfig(
            rates,
        );
        return (
            <div>
                {fetching ? <div>Loading</div> : (
                    <div>
                        <div>{`${originPort.name} to ${destinationPort.name}`}</div>
                        <div>{`${from} to ${to}`}</div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options} // eslint-disable-line
                            showLoading={fetching}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default Chart;
