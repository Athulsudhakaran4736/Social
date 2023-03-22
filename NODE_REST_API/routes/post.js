const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// creating post
router.post('/', async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Updatng post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json('post has been updated');
    } else {
      res.status(403).json('This is not you');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Deleting

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).json('post has been deleted');
    } else {
      res.status(403).json('This is not you');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// like and dislike

router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.like.includes(req.body.userId)) {
      await post.updateOne({ $push: { like: req.body.userId } });
      res.status(200).json('the post has been liked');
    } else {
      await post.updateOne({ $pull: { like: req.body.userId } });
      res.status(200).json('the post has been disliked');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get a post

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get timeline post

router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user's all posts
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userId: user._id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
