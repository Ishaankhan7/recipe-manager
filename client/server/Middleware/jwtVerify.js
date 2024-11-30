const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  try {
    // Extract the token from the cookies
    const token = req.cookies.authtoken;

    // If no token is found, deny access
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user information to the request object
    req.user = verifiedUser;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = jwtVerify;
