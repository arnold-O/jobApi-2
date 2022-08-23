const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    manlength: 12,
  },
  email: {
    type: String,
    required: [true, "please provide name"],
    unique: true,
    validate: [validator.isEmail, "please provide a valid mail"],
  },
  password: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    manlength: 12,
  },
});
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT =  function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.comparePassword = async function(userPassword){
  const is_Match = await bcrypt.compare(userPassword, this.password)
  return is_Match
}


module.exports = mongoose.model("User", userSchema);
