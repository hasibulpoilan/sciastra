// controllers/blogController.js
const Blog = require('../models/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blogs', error });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog', error });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const [updated] = await Blog.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedBlog = await Blog.findByPk(req.params.id);
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
