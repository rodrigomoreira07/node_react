const express = require('express');
const { getPosts, createPost } = require('../controllers/post')
const { createPostValitador } = require('../validators');

const router = express.Router();

router.get('/', getPosts)
router.post('/post', createPostValitador, createPost)

module.exports = router;