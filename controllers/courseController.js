// controllers/courseController.js
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCourse = await Course.findByPk(req.params.id);
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};
