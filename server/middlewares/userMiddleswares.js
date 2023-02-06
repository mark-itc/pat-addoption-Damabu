const JWT = require('jsonwebtoken');

const verifyPassword = (req, res, next) => {
  const { password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  next();
};

const protectToken = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = await JWT.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

module.exports = { verifyPassword, protectToken };
