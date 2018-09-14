import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { generateConfig } from './Util';


const Chart = props => (
    <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={generateConfig(props.series)} // eslint-disable-line
        />
    </div>
);

export default Chart;
