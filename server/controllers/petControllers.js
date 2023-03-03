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

const getPetById = async (req, res) => {
  const { id } = req.params;
  let pet;

  try {
    pet = await AddPet.findById(id);
  } catch (error) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }
  res.status(200).json({ pet });
};

const getAllPets = async (req, res) => {
  const filter = {};

  console.log(req.query);

  for (const prop in req.query) {
    if (req.query[prop]) {
      filter[prop] = req.query[prop];
    }
  }

  console.log(filter);

  const pets = await AddPet.find(filter);

  res.status(200).json({ pets });
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const imgPet = req.file;

  console.log(imgPet);

  if (imgPet) {
    const imgRef = ref(storage, `images/pets/${imgPet.originalname}`);
    const resImg = await uploadBytes(imgRef, imgPet.buffer);
    const urlImg = await getDownloadURL(imgRef);
    req.body.picture = urlImg;
  }

  const pet = await AddPet.findById(id);

  await pet.updateOne(req.body);

  res.status(200).json({ message: 'Pet updated' });
};

module.exports = { addPet, getPetById, getAllPets, updatePet };
