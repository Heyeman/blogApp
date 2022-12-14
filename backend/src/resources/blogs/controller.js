const asyncHandler = require("express-async-handler"),
  Blog = require("./model"),
  DAL = require("../../common/dal"),
    BlogDAL = DAL(Blog),
    {ObjectId} = require('mongoose').Types;

// Blog title
// Blog content
// Assets
// LikedBy
// Likes(int)
// Comments
// PostedBy
const addBlog = asyncHandler(async (req, res) => {
  const { title, content, assets } = req.body;
  let errorString = "";
  errorString += !title ? "Title is required. " : "";
  errorString += !content ? "Content is required." : "";
  if (errorString) {
    res.statusCode = 400;
    throw new Error(errorString);
    }
    const blogInfo = {
        title, content,assets, postedBy: ObjectId(req.userId)
    }
    try {
        const addedBlog = await BlogDAL.createOne(blogInfo);
        console.log(addedBlog)
        res.status(201).json(addedBlog)
    }
    catch (error) {
        res.statusCode = 400;
        throw new Error(error.message)
    }
});

module.exports = { addBlog };
