const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { authenticateToken };
