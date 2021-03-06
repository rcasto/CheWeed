var expect = require('chai').expect;
var request = require('request');

var app_id = "c8e3ed05";
var app_key = "2110900bd8cdf5d5283300cc50ca21e8";

var leafly_api = "http://data.leafly.com";
var locations_api = "/locations";
var strains_api = "/strains";

describe('Leafly API connection testing', function () {

    it('can connect to leafly api', function (done) {
    	request({
	        url: leafly_api + strains_api,
	        method: "POST",
	        headers: {
	            app_id: app_id,
	            app_key: app_key
	        },
	        body: {
                Page: 0,
                Take: 10
            },
            json: true,
            timeout: 120000 // 2 minutes
	    }, function (error, response, body) {
	    	expect(error).not.exist();
	    	expect(response.statusCode).to.equal(200);
	    	expect(body).to.exist();
	    	done();
	    });
    });
    
});