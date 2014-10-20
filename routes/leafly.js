var express = require('express');
var http = require('http');

var router = express.Router();

var app_id = "c8e3ed05";
var app_key = "2110900bd8cdf5d5283300cc50ca21e8";

var leafly_api = "data.leafly.com";

var locations_api = "/locations";
var strains_api = "/strains";

router.post('/searchLocations', function (req, res) {
    console.log(req.body);

    var req = http.request({
        hostname: leafly_api,
        method: 'POST',
        path: locations_api
    }, function (response) {
        console.dir(response);
    });

    req.on('error', function (error) {
        console.dir(error);
    });
});

router.get('/searchStrains', function (req, res) {

});

module.exports = router;