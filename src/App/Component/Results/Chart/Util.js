// import Highcharts from 'highcharts';
// import { SUBTLE_BACKGROUND_COLOR } from '../../../CONSTANT';


const chartTemplate = {
    credits: {
      enabled: false,
    },
    chart: {
        // backgroundColor: SUBTLE_BACKGROUND_COLOR,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
    },
    title: {
        useHTML: true,
        text: null,
    },
    xAxis: {
        type: 'datetime',
        gridLineWidth: 0,
        title: {
            text: 'Months',
        },
    },
    yAxis: {
        title: {
            text: 'Freight Rate',
        },
        gridLineWidth: 0,
    },
    legend: {
        enabled: false,
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, '#212121'],
                    [1, 'rgba(255, 255, 255, 0.0)'],
                ],
            },
            marker: {
                radius: 2,
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1,
                },
            },
            threshold: null,
        },
        series: {
            color: '#212121',
            marker: {
                enabled: false,
            },
        },
    },

    series: [{
        type: 'area',
        name: 'Rate',
    }],
};

const generateConfig = (rates) => {
    const config = Object.assign({}, chartTemplate);
    if (!rates) {
        return null;
    }
    config.series[0].data = rates;
    return config;
};


const ISOtoTimestamp = date => (new Date(date)).getTime();

const toTimestampSeries = rates => rates.map(rate => rate.map((element) => {
    let unixTimeStamp;
    if (typeof element === 'string') { // TODO: bad check. maybe find some way to parse and check if this can be a date object?
        unixTimeStamp = ISOtoTimestamp(element);
        return unixTimeStamp;
    }
    return element;
})).sort(); // because Highcharts demands us to have a pre-sorted array for rendering performance.
// Refer Highcharts Error #15.

export {
    generateConfig,
    toTimestampSeries,
};
