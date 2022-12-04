const mongoose = require("mongoose"),
  { Schema, Types } = mongoose;
const refreshTokenSchema = new Schema({
  token: {
    required: true,
  },
  userId: {
    type: Types.userId,
    required: true,
  },
  lastUsed: {
    default: null,
  },
});

refreshTokenModel.methods.pre('save',)
const refreshTokenModel = mongoose.model('tokens', refreshTokenSchema)