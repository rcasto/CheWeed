var express = require('express');
var request = require('request');

var router = express.Router();

var app_id = "fake";
var app_key = "fake";

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
        body.userData = {};
        body.userData.lat = data.latitude;
        body.userData.lon = data.longitude;
        res.send(body);
    });
});

router.post('/log', function (req, res) {
    console.log(req.body);
    res.end();
});

router.get('/searchStrains', function (req, res) {
});

module.exports = router;