var restify = require('restify');
var server = restify.createServer();
var setup = require ('./controller/setup.js');
var controller = require('./controller/controller.js');
var restifyValidator = require('restify-validator');

var mongoose = require('mongoose');
mongoose.connect("mongo address");

setup(server,restify,restifyValidator);
controller(server);

server.listen(process.env.PORT,function(){
	console.log('%s listen at %s',server.name,server.url);
});