const mongoose = require("mongoose");
// Blog title
// Blog content
// Assets
// LikedBy
// Likes(int)
// Comments
// PostedBy
const actorSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
});
const assetSchema = mongoose.Schema({
  assetUrl: {
    type: String,
  },
});

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  assets: {
    type: [assetSchema],
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likedBy: {
    type: [actorSchema],
  },
  likes: {
    type: Number,
  },
  commenters: {
    type: [actorSchema],
  },
  comments: {
    type: Number,
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
