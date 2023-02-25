const express = require('express');
const { addPet } = require('../controllers/petControllers');
const { protectToken } = require('../middlewares/userMiddleswares');
const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/allpet', addPet);

router.use(protectToken);

router.post('/pet', upload.single('imgPet'), addPet);

module.exports = { petRouter: router };
