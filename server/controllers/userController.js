const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models/userModel');
const { AddPet } = require('../models/addPetModel');

dotenv.config({ path: './.env' });

const signUp = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, rol } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(phoneNumber);

    const user = await User.create({
      email,
      firstName: firstName.trim(),
      lastName,
      phoneNumber,
      password: hashedPassword,
      rol,
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

const getAllUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 });

  res.status(200).json({ users });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  user.password = undefined;

  res.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const existEmail = await User.findOne({ email });

  if (existEmail) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const user = await User.findOne({ _id: id });
  await user.updateOne({ $set: req.body });

  res.status(200).json({ message: 'User updated' });
};

const getUserByIdFull = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const user = await User.findById({ _id: id });
  const adoptedPets = await AddPet.find({ adoptedBy: id });

  user.password = undefined;

  const userFull = { ...user._doc, adoptedPets };

  res.status(200).json({ userFull });
};

module.exports = {
  signUp,
  login,
  getUserById,
  updateUser,
  getAllUsers,
  getUserByIdFull,
};
