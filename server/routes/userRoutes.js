const express = require('express');
const { signUp, login } = require('../controllers/userController');
const { verifyPassword } = require('../middlewares/userMiddleswares');
const { userValidate } = require('../middlewares/validatorMiddlewares');

const router = express.Router();

router.post('/signup', userValidate, verifyPassword, signUp);
router.post('/login', login);

module.exports = { userRouter: router };
