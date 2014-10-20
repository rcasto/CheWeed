var express = require('express');
var request = require('request');

var router = express.Router();

var app_id = "c8e3ed05";
var app_key = "2110900bd8cdf5d5283300cc50ca21e8";

var leafly_api = "http://data.leafly.com";

var locations_api = "/locations";
var strains_api = "/strains";

router.post('/searchLocations', function (req, res) {
    var body = req.body;
    request({
        url: "http://data.leafly.com/locations",
        method: "POST",
        body: body,
        json: true,
        headers: {
            app_id: app_id,
            app_key: app_key
        }
    }, function (error, response, body) {
        res.send(body);
    });
});

router.get('/searchStrains', function (req, res) {

});

module.exports = router;