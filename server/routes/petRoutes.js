const express = require('express');
const {
  addPet,
  getPetById,
  getAllPets,
} = require('../controllers/petControllers');
const { protectToken } = require('../middlewares/userMiddleswares');
const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/allpet', addPet);

router.use(protectToken);

router.post('/pet', upload.single('imgPet'), addPet);
router.get('/getpetbyid/:id', getPetById);
router.get('/getallpets', getAllPets);

module.exports = { petRouter: router };
