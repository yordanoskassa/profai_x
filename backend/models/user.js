const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
})

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel
