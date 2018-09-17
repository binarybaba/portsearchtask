import { PRIMARY_COLOR, TRANSPARENT } from '../../../CONSTANT';


const chartTemplate = {
    credits: {
      enabled: false,
    },
    chart: {
        backgroundColor: TRANSPARENT,
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
            text: 'Freight Rates',
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
                    [0, PRIMARY_COLOR],
                    [1, TRANSPARENT],
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
            color: PRIMARY_COLOR,
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
    if (typeof element === 'string') {
        // TODO: bad check. maybe parse and check if this turns out to be a date object ? Laters..
        unixTimeStamp = ISOtoTimestamp(element);
        return unixTimeStamp;
    }
    return element;
})).sort();
// because Highcharts demands us to have a pre-sorted array for rendering performance.
// Refer Highcharts Error #15.

export {
    generateConfig,
    toTimestampSeries,
};
