require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');  // For session handling
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Set up sessions (or use a token-based approach if you prefer)
app.use(session({
    secret: 'your_secret_key', // replace with a secure key
    resave: false,
    saveUninitialized: false,
}));

// Serve login and signup pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'signup.html'));
});

// Route to handle home page, with authentication check
app.get('/', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'home.html'));
});

// Use other routes (like authentication routes)
app.use('/auth', authRoutes);
app.use('/', homeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
