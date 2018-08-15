var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const adapter = new FileAsync('db/db.json')

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

router.get('/ports/:id', function (req, res) {
    low(adapter)
        .then(db => {
            return db.get('ports')
                .find({ 'id': req.params.query.toUpperCase()})
                .value();
        })
        .then(result => {
            res.send(result);
        })
});

router.get('/ports/search/:query', function(req, res) {
    low(adapter)
        .then(db => { 
            return db.get('ports')
                .map(obj => { 
                    const re = new RegExp(escapeRegExp(req.params.query), 'i');
                    if (
                        obj.id.includes(req.params.query.toUpperCase())
                        || obj.name.match(re)
                    ) {
                        return obj;
                    }
                    return false;
                })
                .filter()
                .value();

        })
        .then(result => {
            res.send(result);
        })
});

module.exports = router;
