import React from 'react';
import { Link } from 'react-router-dom';
import Chart from './Chart/Index';

const Results = props => (
    <div>
        <h1>Results</h1>
        <Link to="/">Landing</Link>
        <Chart />
        <pre>
            <code>
                { JSON.stringify(props, null, 4) }
            </code>
        </pre>
    </div>
);

export default Results;
