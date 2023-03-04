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

const adoptPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const pet = await AddPet.findById(id);

  const result = await AddPet.updateOne(
    { _id: id },
    { $set: { adoptedBy: userId, adoptionStatus: 'Adopted' } }
  );

  res.status(200).json({ message: 'Pet adopted' });
};

const returnPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const pet = await AddPet.findById(id);

  const result = await AddPet.updateOne(
    { _id: id },
    { $set: { adoptedBy: null, adoptionStatus: 'Available' } }
  );

  res.status(200).json({ message: 'Pet returned' });
};

const savePet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  console.log(userId);

  const user = await User.findByIdAndUpdate(userId, {
    $addToSet: { savePets: id },
  });

  res.status(200).json({ message: 'Pet saved' });
};

const deletePet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const user = await User.findById(userId);

  user.savePets.pull(id);
  await user.save();

  res.status(200).json({ message: 'Pet deleted from saved' });
};

const getPetsByUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  const adoptedPets = await AddPet.find({ adoptedBy: id });
  const favoritePets = await AddPet.find({ _id: { $in: user.savePets } });

  return res.status(200).json({ adoptedPets, favoritePets });
};

module.exports = {
  addPet,
  getPetById,
  getAllPets,
  updatePet,
  adoptPet,
  returnPet,
  savePet,
  deletePet,
  getPetsByUser,
};
