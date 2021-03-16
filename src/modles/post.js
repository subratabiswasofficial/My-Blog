const mongoose = require("mongoose");
const moment = require("moment");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  date: {
    type: Date,
    default: moment(),
  },

  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },

  img: {
    type: String,
  },

  likers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: moment(),
      },
    },
  ],
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
