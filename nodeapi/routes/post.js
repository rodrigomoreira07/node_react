const express = require('express');
const { getPosts, createPost, portsByUser, postById, isPoster, deletePost, updatePost } = require('../controllers/post');
const { userById } = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');
const { createPostValitador } = require('../validators');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/by/:userId', requireSignin, portsByUser);

router.post('/post/new/:userId', requireSignin, createPost, createPostValitador);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);
// any route containing :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;