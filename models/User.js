const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: Number,
  race: String,
  age: Number,
  location: String,
  locationNumber: String,
  UTCdateTime: String,
  height: String,
  gender: String,
  userComplete: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('User', UserSchema);
