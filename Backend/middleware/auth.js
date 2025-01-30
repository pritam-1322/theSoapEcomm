import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const { token } = req.headers;

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found. Not Authorized.",
    });
  }

  try {
    // Verify the token and extract user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the userId to the `req` object
    req.userId = decodedToken.id;

    // Call the next middleware or controller
    next();
  } catch (error) {
    console.log("JWT Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token. Not Authorized.",
    });
  }
};

export default authUser;
