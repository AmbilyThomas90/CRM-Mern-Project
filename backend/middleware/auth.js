import jwt from "jsonwebtoken";

/**
 * auth middleware
 * Protects routes by verifying JWT token
 */
const auth = (req, res, next) => {
  // Get token from either 'x-auth-token' header or 'authorization' header
  const token = req.header("x-auth-token") || req.header("authorization");

  // If no token is provided, deny access
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Handle Bearer token format: "Bearer <token>"
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]  // extract the token part
      : token;

    // Verify token using JWT secret
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach decoded payload (user info) to req.user for downstream use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed: invalid or expired token
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
