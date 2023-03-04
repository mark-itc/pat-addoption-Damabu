const express = require('express');
const {
  signUp,
  login,
  getUserById,
  updateUser,
  getAllUsers,
  getUserByIdFull,
} = require('../controllers/userController');
const { verifyPassword } = require('../middlewares/userMiddleswares');
const { userValidate } = require('../middlewares/validatorMiddlewares');

const router = express.Router();

router.post('/signup', userValidate, verifyPassword, signUp);
router.post('/login', login);
router.get('/getAll', getAllUsers);
router.get('/:id/full', getUserByIdFull);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

module.exports = { userRouter: router };
