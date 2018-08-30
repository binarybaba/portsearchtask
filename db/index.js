const path = require('path');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync(path.join(__dirname, './db.json'));

function getPort(id) {
    return low(adapter)
        .then(db => db.get('ports')
            .find({
                'id': id.toUpperCase()
            })
            .value()
        );
};

function searchPorts(query) {
    const re = new RegExp(query, 'i');

    return low(adapter)
        .then(db => db.get('ports')
            .map(obj => (
                obj.id.includes(query.toUpperCase())
                || obj.name.match(re)
                    ? obj
                    : false
            ))
            .filter()
            .value()
        );
};

function getRates(origin, destination, fromdate, todate) {
    return low(adapter)
        .then(db => db.get('rates')
            .filter(obj => (
                origin.toUpperCase() === obj.origin &&
                destination.toUpperCase() === obj.destination
            ))
            .map(obj => (
                obj.timeseries.filter(datapoint => (
                    fromdate <= datapoint[0] &&
                    todate >= datapoint[0]
                ))))
            .reduce((a, b) => a.concat(b))
            .value()
        );
};

module.exports = {
    getPort,
    searchPorts,
    getRates
};
