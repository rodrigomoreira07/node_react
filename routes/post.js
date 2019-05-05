const express = require('express');
const { getPosts, createPost } = require('../controllers/post')
const validator = require('../validators');

const router = express.Router();

router.get('/', getPosts)
router.post('/post', validator.createPostValitador, createPost)

module.exports = router;