const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for users
const users = [];

// Sample lessons data
const lessons = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Learn essential greetings and introductions in Uzbek language"
  },
  {
    id: 2,
    title: "Numbers and Counting",
    description: "Master numbers from 1 to 100 and basic counting in Uzbek"
  },
  {
    id: 3,
    title: "Common Phrases",
    description: "Everyday phrases and expressions for daily conversations"
  },
  {
    id: 4,
    title: "Food and Dining",
    description: "Vocabulary and phrases related to food, restaurants, and dining"
  },
  {
    id: 5,
    title: "Travel Essentials",
    description: "Important phrases and vocabulary for traveling in Uzbekistan"
  }
];

// GET /api/lessons endpoint
app.get('/api/lessons', (req, res) => {
  res.json(lessons);
});

// GET /api/lessons/:id endpoint
app.get('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === parseInt(req.params.id));
  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }
  res.json(lesson);
});

// POST /api/users endpoint
app.post('/api/users', (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Email and password are required' 
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'Invalid email format' 
    });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({ 
      message: 'Password must be at least 6 characters long' 
    });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ 
      message: 'User with this email already exists' 
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password, // In a real application, this should be hashed
    createdAt: new Date().toISOString()
  };

  // Store user
  users.push(newUser);

  // Return success response (excluding password)
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword
  });
});

// POST /api/login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }

  // Find user by email
  const user = users.find(u => u.email === email);
  
  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  // Return success response (excluding password)
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login successful',
    user: userWithoutPassword
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 