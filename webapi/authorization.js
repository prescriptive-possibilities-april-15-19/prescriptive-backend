const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);
  console.log(token);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) {
        res.status(401).json({ message: 'Invalid credential.' })
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};