import Highcharts from 'highcharts';


const chartTemplate = {
    credits: {
      enabled: false,
    },
    chart: {
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
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
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
    },

    series: [{
        type: 'area',
        name: 'Rate',
        // data: data
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
