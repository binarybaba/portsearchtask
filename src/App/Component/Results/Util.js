
const ISOtoTimestamp = date => (new Date(date)).getTime();

const toTimestampSeries = rates => rates.map(rate => rate.map((element) => {
    let unixTimeStamp;
    if (typeof element === 'string') { // TODO: bad check. maybe find some way to parse and NaN?
        unixTimeStamp = ISOtoTimestamp(element);
        return unixTimeStamp;
    }
    return element;
})).sort();

export {
    toTimestampSeries, // eslint-disable-line
};
