var bcrypt = require('bcrypt');

function _respond(res, next, status, data, http_code){
	var response  ={
		// 'status' : status,
		'data': data
	};
	res.setHeader('content-type','application/json');
	res.writeHead(http_code);
	res.end(JSON.stringify(response));
	return next();
};
module.exports.succes=function(res,next,data){
	_respond(res,next,'succes',data,200);
};
module.exports.failure=function(res,next,data,http_code){
	_respond(res,next,'failure',data,http_code);
}


module.exports.cryptPassword = function(password, callback) {
	bcrypt.genSalt(10, function(err, salt) {
	   if (err) 
		   return callback(err);

	   bcrypt.hash(password, salt, function(err, hash) {
		   return callback(err, hash);
	   });
   });
};

module.exports.comparePassword = function(plainPass, hashword, callback) {
	bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
			return err == null ?
					callback(null, isPasswordMatch) :
					callback(err);
	});
};

