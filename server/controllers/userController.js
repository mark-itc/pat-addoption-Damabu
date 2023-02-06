const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models/userModel');

dotenv.config({ path: './.env' });

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(phoneNumber);

    const user = await User.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
    });

    user.password = undefined;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    if (error && error.code === 11000) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    return res.status(403).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: 'Credentials invalids' });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: 'Credencials invalids' });
  }

  const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
};

module.exports = { signUp, login };
