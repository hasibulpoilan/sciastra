// scripts.js

// API Base URL
const apiBaseURL = 'http://localhost:5000/api';

// Fetch discounted courses and display them
async function fetchCourses() {
    try {
        const response = await fetch(`${apiBaseURL}/courses`);
        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Display courses in the HTML
function displayCourses(courses) {
    const courseContainer = document.getElementById('course-container');
    courseContainer.innerHTML = '';
    courses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = 'course-item';
        courseElement.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Discount Price:</strong> $${course.price}</p>
            <button onclick="purchaseCourse(${course.id})">Buy Now</button>
        `;
        courseContainer.appendChild(courseElement);
    });
}

// Fetch latest blogs and display them
async function fetchBlogs() {
    try {
        const response = await fetch(`${apiBaseURL}/blogs`);
        const blogs = await response.json();
        displayBlogs(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

// Display blogs in the HTML
function displayBlogs(blogs) {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';
    blogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.className = 'blog-item';
        blogElement.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content.substring(0, 100)}...</p>
            <button onclick="viewBlog(${blog.id})">Read More</button>
        `;
        blogContainer.appendChild(blogElement);
    });
}

// Trigger course purchase (placeholder)
function purchaseCourse(courseId) {
    alert(`Redirecting to payment for course ID: ${courseId}`);
    // Future: Implement redirect to payment page
}

// Trigger blog view (placeholder)
function viewBlog(blogId) {
    alert(`Viewing blog ID: ${blogId}`);
    // Future: Implement full blog view
}

function purchaseCourse(courseId) {
    alert(`Redirecting to payment page for course ID: ${courseId}`);
    window.location.href = 'payment.html';
}


// Fetch and display courses and blogs on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
    fetchBlogs();
});
