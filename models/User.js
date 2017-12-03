var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: {
    type: String,
    unique: true,
    required: true
  },
	phoneNumber: {
    type: Number
  },
  race: {
    type: String
  },
  age: {
    type: Number
  },
  location: {
    type: String,
  },
  locationNumber: {
    type: Number
  },
  time: {
    type: String
  },
  date: {
    type: String
  },
  height: {
    type: String
  }, 
  gender: {
    type: String
  },
  userComplete: {
    type: Boolean,
    default: false
  }


});

var User = mongoose.model("User", UserSchema);
module.exports = User;