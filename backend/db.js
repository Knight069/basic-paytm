// docker restart e1db9182f28a06c3b224fe752458f401eb4d5f1749922457dfe640a97ae3d07a
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/paytm");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
});


// account schema with userId and balance

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
};
