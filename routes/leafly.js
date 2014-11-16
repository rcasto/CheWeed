var express = require('express');
var request = require('request');
var crypto = require('crypto');

var router = express.Router();

var app_id = "c8e3ed05";
var app_key = "2110900bd8cdf5d5283300cc50ca21e8";

var leafly_api = "http://data.leafly.com";
var locations_api = "/locations";
var strains_api = "/strains";

// extract cache-control settings from leafly response, set CheWeed cache-control
// to have these same settings. copy cache-control essentially
function copyCacheHeader(leaflyResp, serverResp) {
    var headers = leaflyResp.headers;
    serverResp.set({
        'cache-control': headers['cache-control'],
        'content-type': headers['content-type']
    });
}

function leaflyRequest(api, method, data, callback) {
    request({
        url: leafly_api + api,
        method: method,
        body: data,
        json: true,
        headers: {
            app_id: app_id,
            app_key: app_key
        }
    }, callback);
}

function strainsPOST(body, callback) {
    leaflyRequest(strains_api, 'POST', body, callback);
}
function strainsGET(params, callback) {
    // TODO: may need to convert javascript object to query string
    leaflyRequest(strains_api, 'GET', body, callback);
}

function locationsPOST(body, callback) {
    leaflyRequest(locations_api, 'POST', body, callback);
}
function locationsGET(params, callback) {
    // TODO: may need to convert javascript object to query string
    leaflyRequest(locations_api, 'GET', body, callback);
}

router.get('/searchLocations', function (req, res) {
    var params = req.query;
    locationsPOST(params, function (error, response, body) {
        if (error) {
            res.send(error);
            return;
        }
        copyCacheHeader(response, res);
        body.userData = {
            lat: params.latitude,
            lon: params.longitude
        };
        res.send(body);
    });
});

router.get('/strains', function (req, res) {
    var params = req.query;
    strainsPOST(params, function (error, response, body) {
        if (error) {
            res.send(error);
            return;
        }
        copyCacheHeader(response, res);
        res.send(body);
    });
});

router.get('/searchStrains', function (req, res) {
});

router.get('/availability', function (req, res) {
});

module.exports = router;