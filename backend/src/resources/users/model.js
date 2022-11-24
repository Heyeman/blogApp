const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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

  metaData: {
    profilePicture: {
      type: String,
      default: process.env.DEFAULT_PROFILE_PICTURE_URL,
    },
    blogs: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    joined: {
      type: Date,
      default: Date.now,
    },
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
