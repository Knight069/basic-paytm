import mongoose from "mongoose";
const { Schema } = mongoose;

const connectionString = "mongodb://localhost:27017/paytm";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 6
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 6
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

const User = mongoose.model('User', userSchema)

module.exports = {
    User
};
