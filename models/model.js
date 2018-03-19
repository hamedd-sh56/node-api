var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	objectId = Schema.objectId;
var userSchema = new Schema({
  name  : String,
  serial: Number,
  email : String,
  pass  : String,
  date: { type: Date, default: Date.now }
  
});
var mymodel = mongoose.model('userdata',userSchema);
module.exports = mymodel;
