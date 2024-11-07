// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Session-based login (check username and password)
exports.loginWithSession = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        // Check if the password matches
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid username or password');
        }

        // If username and password are correct, store user in session
        req.session.user = user;  // Store user in session
        return res.redirect('/');  // Redirect to home page
    } catch (error) {
        console.error(error);
        return res.status(500).send('Database error');
    }
};
// controllers/authController.js
exports.loginWithToken = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        // Check if the password matches
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid username or password');
        }

        // If username and password are correct, generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Database error');
    }
};

