var plivo = require('plivo-node');
var Plivo;
var request = require('request');
var helper = require("../helpers")

Plivo = function(keys){
	this.name = "plivo";
	this.keys = keys;
	this.validate = function(callback) {
		this.keyErrors = helper.validatePlivoCall(this.keys);
		if(this.keyErrors.length!=0){
			console.log(this.keyErrors);
			return callback(this.keyErrors, null);
		}
		request(this.getOptions(this.keys.authId, this.keys.authToken), function(err, result) {
		if (result.statusCode==500) {
			return callback(result.body, null);
		}
		else return callback(null, result);
	});
	}
	this.getOptions = function(authId, authToken) {
		var options = {
			url: 'https://api.plivo.com/v1.Account/',
			method: 'GET',
			auth : {
      	'user': authId,
				'pass': authToken,
				'sendImmediately' : false
      }
		};
	return options;
	}
	return this;
  };

module.exports = Plivo;
