const asyncHandler = require("express-async-handler"),
  Blog = require("./model"),
  DAL = require("../../common/dal"),
  BlogDAL = DAL(Blog),
  { ObjectId } = require("mongoose").Types;

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
    title,
    content,
    assets,
    postedBy: ObjectId(req.userId),
  };
  try {
    const addedBlog = await BlogDAL.createOne(blogInfo);
    res.status(201).json(addedBlog);
  } catch (error) {
    res.statusCode = 400;
    throw new Error(error.message);
  }
});

const viewBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await BlogDAL.getOne({ _id: ObjectId(blogId) });
    if (!blog) {
      throw new Error("Blog not found");
    }
    res.status(200).json(blog);
  } catch (error) {
    res.statusCode = 404;
    throw new Error("Blog not found");
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const userId = ObjectId(req.userId),
    blogId = ObjectId(req.params.id);

  const blog = await BlogDAL.getOne({ _id: blogId });
  if (!blog) {
    res.statusCode = 404;
    throw new Error("Blog not found");
  }

  if (blog.likedBy.indexOf(userId) == -1) {
    res.send("user hasnt liked");
    BlogDAL.updateOne(
      { _id: blogId },
      {
        push: {
          likedBy: userId,
        },
        inc: {
          likes: 1,
        },
      }
    );
  } else {
    res.send("user has liked it");
  }
});
module.exports = { addBlog, viewBlog, likeBlog };
