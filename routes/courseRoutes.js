const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// GET route to fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Unable to fetch courses' });
    }
});

// POST route to create a new course (for admin)
router.post('/', async (req, res) => {
    const { title, description, price, discountPrice } = req.body;

    try {
        const newCourse = await Course.create({
            title,
            description,
            price,
            discountPrice
        });

        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Unable to create course' });
    }
});

module.exports = router;
