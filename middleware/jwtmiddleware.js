const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, "secretKey"); // 👈 Hardcoded secret key
    req.payload = decoded.userId; // Only store the userId in req.payload
    next();
  } catch (error) {
    return res.status(401).json({ error: `Authorization failed: ${error.message}` });
  }
};

module.exports = jwtMiddleware;
