var express = require('express');
var request = require('request');
var crypto = require('crypto');

var router = express.Router();

var app_id = "c8e3ed05";
var app_key = "2110900bd8cdf5d5283300cc50ca21e8";

var leafly_api = "http://data.leafly.com";
var locations_api = "/locations";
var strains_api = "/strains";

router.post('/searchLocations', function (req, res) {
    var data = req.body;
    request({
        url: leafly_api + locations_api,
        method: "POST",
        body: data,
        json: true,
        headers: {
            app_id: app_id,
            app_key: app_key
        }
    }, function (error, response, body) {
        var headers = {
            'cache-control': response.headers['cache-control']
        };

        body.userData = {};
        body.userData.lat = data.latitude;
        body.userData.lon = data.longitude;

        res.set(headers);
        res.send(body);
    });
});

router.post('/popularStrains', function (req, res) {
    var data = req.body;
    request({
        url: leafly_api + strains_api,
        method: "POST",
        body: data,
        json: true,
        headers: {
            app_id: app_id,
            app_key: app_key
        }
    }, function (error, response, body) {
        var sha = crypto.createHash('sha1');
        sha.update(JSON.stringify(body), 'utf8');
        var headers = {
            'cache-control': response.headers['cache-control'],
            'expires': response.headers['expires'],
            'ETag': sha.digest('base64')
        };
        res.set(headers);
        res.send(body);
    });
});

router.get('/searchStrains', function (req, res) {
});

module.exports = router;