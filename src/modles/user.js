const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
