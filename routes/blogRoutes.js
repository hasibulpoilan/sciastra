const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// GET route to fetch blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: 'Unable to fetch blogs' });
    }
});

// POST route to create a new blog post
router.post('/', async (req, res) => {
    const { title, content, publishDate } = req.body;

    try {
        const newBlog = await Blog.create({
            title,
            content,
            publishDate,
            status: 'draft' // Default status, can be changed as needed
        });

        res.status(201).json(newBlog); // Respond with the created blog post
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Unable to create blog post' });
    }
});

module.exports = router;
