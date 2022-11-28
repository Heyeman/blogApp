const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt"),
  SALT_ROUNDS = 10;
const userSchema = new Schema({
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

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) return next(err);
    user.password = hashedPassword;
    return next();
  });
});

userSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
