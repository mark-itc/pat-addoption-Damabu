const { User } = require('../models/userModel');
const fs = require('fs');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');
const { AddPet } = require('../models/addPetModel');

const addPet = async (req, res) => {
  const { userId } = req;
  const imgPet = req.file;
  const pet = req.body;

  const imgRef = ref(storage, `images/pets/${imgPet.originalname}`);
  const resImg = await uploadBytes(imgRef, imgPet.buffer);
  const urlImg = await getDownloadURL(imgRef);

  pet.picture = urlImg;

  const newPet = await AddPet.create(pet);

  res.status(200).json({ newPet });
};

module.exports = { addPet };
