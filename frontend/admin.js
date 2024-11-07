async function addBlogPost() {
    // Get input values
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const publishDate = document.getElementById('publish-date').value;

    // Create an object to send as a request body
    const newBlog = {
        title,
        content,
        publishDate
    };

    // Send the POST request
    try {
        const response = await fetch('http://localhost:5000/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            alert('Blog post added successfully!');
            document.getElementById('blog-form').reset(); // Reset the form after success
        } else {
            throw new Error('Failed to create blog post');
        }
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
}

// Attach the addBlogPost function to the form submit button
document.getElementById('submit-button').addEventListener('click', addBlogPost);



// Function to add a new course
async function addCourse() {
    const title = document.getElementById('course-title').value;
    const description = document.getElementById('course-description').value;
    const price = document.getElementById('course-price').value;

    const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, price })
    });

    if (response.ok) {
        alert('Course added successfully!');
        document.getElementById('course-form').reset();
    } else {
        alert('Failed to add course');
    }
}
async function fetchCourses() {
    try {
        const response = await fetch('http://localhost:5000/api/courses');
        const courses = await response.json();

        const coursesContainer = document.getElementById('courses-list');
        coursesContainer.innerHTML = ''; // Clear existing courses

        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course-item');
            courseElement.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p><strong>Price:</strong> $${course.price}</p>
                <p><strong>Discount Price:</strong> $${course.discountPrice || 'N/A'}</p>
                <button onclick="selectCourse(${course.id})">Select Course</button>
            `;
            coursesContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Call the fetchCourses function when the page loads
window.onload = fetchCourses;

function selectCourse(courseId) {
    // Redirect to the payment page with the selected course ID
    window.location.href = `payment.html?courseId=${courseId}`;
}
