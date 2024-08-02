const jwt = require('jsonwebtoken')
const JWT_SECRET = "secretkey";

exports.isAdmin = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token not found" })
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    try {
      if (decoded.role !== "admin") {
        res.status(403).json({ error: "Admin access required" })
      }
      req.user = decoded;
      next()
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Unauthorized access" })
    }
  };

  //isUser - todo
  exports.isUser = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: " User Authorization token not found" })
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    try {
      if (decoded.role !== "user") {
        res.status(403).json({ error: "user access required" })
      }
      req.user = decoded;
      next()
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Unauthorized access" })
    }
  };