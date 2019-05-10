const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValitador } = require('../validators');

const router = express.Router();

router.get('/', getPosts)
router.post('/post', requireSignin, createPostValitador, createPost)

module.exports = router;