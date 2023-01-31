const express = require('express');
const { addPet } = require('../controllers/petControllers');
const { protectToken } = require('../middlewares/userMiddleswares');

const router = express.Router();

router.get('/allpet', addPet);

router.use(protectToken);

router.post('/pet', addPet);

module.exports = { petRouter: router };
