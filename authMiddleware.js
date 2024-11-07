// authMiddleware.js
function authMiddleware(req, res, next) {
    // Check for a session or token in the request
    const isAuthenticated = req.session?.user || req.headers.authorization;
    
    if (isAuthenticated) {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/login'); // User is not authenticated, redirect to login
    }
}

module.exports = authMiddleware;
