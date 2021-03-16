// main Dependencies
const express = require("express");
const router = express.Router();

// util Dependencies
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require("mongoose");

// auth Dependencies
const auth = require("../../middleware/auth");
const { find } = require("../../modles/post");
const Post = require("../../modles/post");
const User = require("../../modles/user");

// @route   POST api/posts
// @desc    Create a Post
// @access  Private
router.post(
  "/posts",
  [
    auth,
    [
      check("title", "Please enter a title").not().isEmpty(),
      check("content", "Please enter a Content of minimum length 20")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    // check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // find the user's name
      const user = await User.findById(req.user.id);

      // if no errors name a post object
      const post = new Post({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content,
        img: req.body.img ? req.body.img : "",
        date: moment(),
      });
      // save post
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/posts", async (req, res) => {
  try {
    // find all posts & sort them by date desec

    const posts = await Post.find()
      .populate("user", ["name"])
      .sort({ date: -1 });
    // send all posts
    return res.status(200).json(posts);
  } catch (error) {
    // console.error(error.message);
    return res.status(500).send("server error");
  }
});

// @route   GET api/posts
// @desc    Get my posts
// @access  Private
router.get("/myposts", auth, async (req, res) => {
  try {
    // find all posts & sort them by date desec
    const page = Number(req.query.page) ? Number(req.query.page) : 0;

    const posts = await Post.find({ user: req.user.id })
      .sort({ date: -1 })
      .skip(page * 6)
      .limit(6);

    // send all posts
    return res.status(200).json(posts);
  } catch (error) {
    // console.error(error.message);
    return res.status(500).send("server error");
  }
});

// @route   GET api/posts/:post_id
// @desc    Get a post by post id
// @access  Private
router.get("/posts/:post_id", async (req, res) => {
  try {
    // find a posts
    const post = await Post.findById(req.params.post_id).populate("user", [
      "name",
    ]);

    if (!post) {
      return res.status(400).json({ errors: [{ msg: "no post found" }] });
    }
    // send the post
    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "no post found" }] })
      : res.status(500).send("server error");
  }
});

// @route   GET api/posts/likesandcomments/:post_id
// @desc    Get like and comment count
// @access  Public
router.get("/posts/likesandcomments/:post_id", async (req, res) => {
  try {
    // find a posts
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(400).json({ errors: [{ msg: "no post found" }] });
    }
    // send the post
    return res.status(200).json({
      likeCount: post.likers.length,
      commentCount: post.comments.length,
    });
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "no post found" }] })
      : res.status(500).send("server error");
  }
});

// @route   GET api/posts/auth/:post_id
// @desc    Get a post by post id
// @access  Private
router.get("/posts/auth/:post_id", auth, async (req, res) => {
  try {
    // find a posts
    const post = await Post.findOne({
      $and: [
        {
          user: req.user.id,
        },
        {
          _id: req.params.post_id,
        },
      ],
    }).populate("user");

    if (!post) {
      return res.status(400).json({ errors: [{ msg: "no post found" }] });
    }
    // send the post
    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "no post found" }] })
      : res.status(500).send("server error");
  }
});

// @route   POST api/posts/update/:post_id
// @desc    UPDATE a post by post id
// @access  Private
router.post("/posts/update/:post_id", auth, async (req, res) => {
  try {
    // find a posts
    const post = await Post.findByIdAndUpdate(req.params.post_id, {
      ...req.body,
    });

    if (!post) {
      return res.status(400).json({ errors: [{ msg: "no post found" }] });
    }

    // send the post
    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "no post found" }] })
      : res.status(500).send("server error");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a post by owner
// @access  Private
router.delete("/posts/:post_id", auth, async (req, res) => {
  try {
    // find a posts
    const post = await Post.findOne({
      $and: [
        {
          user: req.user.id,
        },
        {
          _id: req.params.post_id,
        },
      ],
    });

    if (!post) {
      return res
        .status(400)
        .json({ errors: [{ msg: "user not authorised or no post found" }] });
    }

    await post.remove();

    // send the post
    return res.status(200).send("post deleted");
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "no post found" }] })
      : res.status(500).send("server error");
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post by owner
// @access  Private
router.put("/posts/like/:post_id", auth, async (req, res) => {
  try {
    // brind the post
    const post = await Post.findById(req.params.post_id);

    // check if the post does not exhists
    if (!post) {
      return res.status(400).json({ errors: [{ msg: "post not found" }] });
    }

    // check if the post alrady liked liked or not
    const postDoesHasLike = await Post.findOne({
      $and: [
        {
          _id: req.params.post_id,
        },
        {
          "likers.user": req.user.id,
        },
      ],
    });

    // if the post already been liked
    if (postDoesHasLike) {
      return res
        .status(400)
        .json({ errors: [{ msg: "post already been liked" }] });
    }

    // push user into like array
    await Post.findByIdAndUpdate(req.params.post_id, {
      $push: { likers: { user: req.user.id } },
    });

    // final return
    const updatedPost = await Post.findById(req.params.post_id);
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "post not found" }] })
      : res.status(500).send("server error");
  }
});

// @route   GET api/posts/didiliked/:post_id
// @desc    Is the post is liked bt owner
// @access  Private
router.get("/posts/didiliked/:post_id", auth, async (req, res) => {
  try {
    // brind the post
    const post = await Post.findById(req.params.post_id);

    // check if the post does not exhists
    if (!post) {
      return res.status(400).json({ errors: [{ msg: "post not found" }] });
    }

    // check if the post alrady liked liked or not
    const postDoesHasLike = await Post.findOne({
      $and: [
        {
          _id: req.params.post_id,
        },
        {
          "likers.user": req.user.id,
        },
      ],
    });

    // if the post already been liked
    if (!postDoesHasLike) {
      return res.status(400).json(false);
    }
    return res.status(200).json(true);
  } catch (error) {
    console.error(error.message);
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "post not found" }] })
      : res.status(500).send("server error");
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post by owner
// @access  Private
router.put("/posts/unlike/:post_id", auth, async (req, res) => {
  try {
    // brind the post
    const post = await Post.findById(req.params.post_id);

    // check if the post does not exhists
    if (!post) {
      return res.status(400).json({ errors: [{ msg: "post not found" }] });
    }

    // check if the post alrady liked liked or not
    const postDoesHasLike = await Post.findOne({
      $and: [
        {
          _id: req.params.post_id,
        },
        {
          "likers.user": req.user.id,
        },
      ],
    });

    // if the post not been liked
    if (!postDoesHasLike) {
      return res.status(400).json(false);
    }

    // pull user into like array
    await Post.findByIdAndUpdate(req.params.post_id, {
      $pull: { likers: { user: req.user.id } },
    });

    // final return
    return res.status(200).json(true);
  } catch (error) {
    return error.kind === "ObjectId"
      ? res.status(400).json({ errors: [{ msg: "post not found" }] })
      : res.status(500).send("server error");
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Make a comment to a post
// @access  Private
router.post(
  "/posts/comment/:post_id",
  [auth, [check("text", "Please Enter a text").not().isEmpty()]],
  async (req, res) => {
    try {
      // find the post if exists or not
      const post = await Post.findById(req.params.post_id);

      // if does not exists
      if (!post) {
        return res.status(400).json({ errors: [{ msg: "no post found" }] });
      }

      const { text, date } = req.body;

      // make comment object
      const comment = {
        text,
        user: req.user.id,
      };

      if (date) comment.date = date;

      await Post.findByIdAndUpdate(req.params.post_id, {
        $push: { comments: { ...comment } },
      });
      const updatedPost = await Post.findById(req.params.post_id);
      return res.status(200).json(updatedPost);
    } catch (error) {
      return error.kind === "ObjectId"
        ? res.status(400).json({ errors: [{ msg: "post not found" }] })
        : res.status(500).send("server error");
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:cmt_id
// @desc    Delete a comment from a post
// @access  Private
router.delete("/posts/comment/:post_id/:cmt_id", auth, async (req, res) => {
  try {
    // find the post if exists or not
    const post = await Post.findById(req.params.post_id);
    // if does not exists
    if (!post) {
      return res.status(400).json({ errors: [{ msg: "no post found" }] });
    }

    const commentDoesExists = await Post.findOne({
      $and: [
        { _id: req.params.post_id },
        { "comments._id": req.params.cmt_id },
        { "comments.user": req.user.id },
      ],
    });

    if (!commentDoesExists) {
      return res.status(400).json({
        errors: [{ msg: "user not authorised or comment doesn't exists" }],
      });
    }

    await Post.findByIdAndUpdate(req.params.post_id, {
      $pull: { comments: { _id: req.params.cmt_id } },
    });
    const updatedPost = await Post.findById(req.params.post_id);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return error.kind === "ObjectId"
      ? res
          .status(400)
          .json({ errors: [{ msg: "post not found or comment not found" }] })
      : res.status(500).send("server error");
  }
});

// @route   GET /api/allposts/
// @desc    Get all posts
// @access  Public
router.get("/allposts/", async (req, res) => {
  try {
    const page = Number(req.query.page) ? Number(req.query.page) : 0;
    const posts = await Post.find()
      .sort({ date: -1 })
      .skip(page * 6)
      .limit(6);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send("server error");
  }
});

module.exports = router;
