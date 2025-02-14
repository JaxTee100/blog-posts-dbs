const express = require('express');
const { getAllPosts, getOne, createPost, updateOne, deleteOne } = require('../controllers/post-controllers');
const router = express.Router();



//queries


// Get all posts
router.get('/', getAllPosts);

// Get a single post
router.get('/:id', getOne);

// Create a new post
router.post('/', createPost);

// Update a post
router.put('/:id', updateOne);

// Delete a post
router.delete('/:id', deleteOne);

module.exports = router;
