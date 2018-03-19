var helper = require('../config/helper.js');
var model = require('../models/model.js');


module.exports=function(server){

	//-------SAVE DATA IN DB ------\\
 server.post("/register",function(req,res,next){

 	req.assert('name','name is required').notEmpty();
 	req.assert('pass','password is required').notEmpty();
 	req.assert('serial','serial is required').notEmpty();
	req.assert('email','Email is required').isEmail().notEmpty();

	var errors = req.validationErrors();
	if (errors){
		helper.failure(res,next,errors,400);
	}
	var udata    = new model();
	udata.name   = req.params.name;
	udata.pass   = req.params.pass;
	udata.serial = req.params.serial;
	udata.email  = req.params.email;

	udata.save(function(err){
		if (err){
			helper.failure(res,next,errors,500);
		}
		helper.succes(res,next,udata);
	});
});


server.post("/login",function(req,res,next){

 	req.assert('name','name is required').notEmpty();
 	req.assert('pass','password is required').notEmpty();

	var errors = req.validationErrors();
	if (errors){
		helper.failure(res,next,errors,400);
	}

	model.findOne({name: req.params.name, pass: req.params.pass}, function (err, udata) {
		if(err){
			helper.failure(res,next,'internal errors',500);
		}

		if(udata===null){
			helper.failure(res,next,'not found',404);
		}
			helper.succes(res,next,udata);
	});

});



//------------------------------END POST --------------//

//-------------------------------GET ALL DATA ---------------------//
server.get("/",function(req,res,next){
	model.find({},function(err,udatag){
		helper.succes(res,next,udatag);
	});
});
//------------------------end get------------------------------------/
//------------------------GET WITH SERIAL---------------------------//
	server.get("/user/serial/:serial", function(req, res, next) {
		req.assert('serial','is required!!').notEmpty();
			var errors =req.validationErrors();
			if (errors){
				helper.failure(res,next,errors[0],400);
			}
  
   		model.findOne({serial : req.params.serial}, function (err, udata) {
			if(errors){
		 	   helper.failure(res,next,'internal errors',500);
			}
			if(udata===null){
				helper.failure(res,next,'not found',404);
			}
  
				helper.succes(res,next,udata);
		});
  
	});

};
