var express = require('express');
var request = require('request');

var router = express.Router();

var app_id = "c8e3ed05";
var app_key = "2110900bd8cdf5d5283300cc50ca21e8";

var leafly_api = "http://data.leafly.com";
var locations_api = "/locations";
var strains_api = "/strains";

function setHeader(leaflyResp, serverResp) {
    var headers = leaflyResp.headers;
    serverResp.set({
        'cache-control': headers['cache-control'],
        'content-type': headers['content-type']
    });
}

router.get('/searchLocations', function (req, res) {
    var params = req.query;
    request({
        url: leafly_api + locations_api,
        method: "POST",
        body: params,
        json: true,
        headers: {
            app_id: app_id,
            app_key: app_key
        }
    }, function (error, response, body) {
        if (error) {
            res.send(error);
            return;
        }
        setHeader(response, res);
        body.userData = {
            lat: params.latitude,
            lon: params.longitude
        };
        res.send(body);
    });
});

router.get('/popularStrains', function (req, res) {
    var params = req.query;
    request({
        url: leafly_api + strains_api,
        method: "POST",
        body: params,
        json: true,
        headers: {
            app_id: app_id,
            app_key: app_key
        }
    }, function (error, response, body) {
        if (error) {
            res.send(error);
            return;
        }
        setHeader(response, res);
        res.send(body);
    });
});

router.get('/searchStrains', function (req, res) {
});

module.exports = router;