const express = require('express');
const {
  addPet,
  getPetById,
  getAllPets,
  updatePet,
  adoptPet,
  returnPet,
  savePet,
  deletePet,
  getPetsByUser,
} = require('../controllers/petControllers');
const { protectToken } = require('../middlewares/userMiddleswares');
const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/allpet', addPet);
router.get('/getallpets', getAllPets);

router.use(protectToken);

router.post('/pet', upload.single('imgPet'), addPet);
router.get('/getpetbyid/:id', getPetById);
router.patch('/updatepet/:id', upload.single('imgPet'), updatePet);
router.post('/pet/:id/adopt', adoptPet);
router.post('/pet/:id/return', returnPet);
router.post('/pet/:id/save', savePet);
router.delete('/pet/:id/delete', deletePet);
router.get('/pet/user/:id', getPetsByUser);

module.exports = { petRouter: router };
