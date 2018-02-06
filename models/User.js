const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
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
    type: String
  },
  UTCdateTime: {
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

module.exports = mongoose.model('User', UserSchema);