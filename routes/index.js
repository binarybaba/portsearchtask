var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = function (__dirname) {
    return router.get('/', function(req, res, next) {
        res.sendFile(__dirname+'/index.html');
    });
};
