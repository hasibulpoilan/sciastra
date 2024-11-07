require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Blog = require('./models/Blog');
const Course = require('./models/Course');
const UserTransaction = require('./models/UserTransaction');
const blogRoutes = require('./routes/blogRoutes'); // Importing blog routes
const courseRoutes = require('./routes/courseRoutes'); // Importing course routes
const transactionRoutes = require('./routes/transactionRoutes');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// Using imported route handlers
app.use('/api/blogs', blogRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/transactions', transactionRoutes);

// Test the database connection and sync models
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync({ alter: true }) // `alter: true` updates tables without data loss
  .then(() => console.log('Database synced.'))
  .catch(err => console.error('Error syncing database:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the SciAstra platform!');
});
// Assuming you are using Express
app.get('/api/courses/:courseId', async (req, res) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(400).json({ error: 'Course ID is required' });
    }
    try {
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
