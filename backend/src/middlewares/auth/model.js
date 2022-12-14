const mongoose = require("mongoose"),
  { Schema, Types } = mongoose;
const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  lastUsed: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("refreshTokens", refreshTokenSchema);
