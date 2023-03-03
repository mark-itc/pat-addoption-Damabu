const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addPetSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  adoptionStatus: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  hypoallergenic: {
    type: Boolean,
    required: true,
  },
  dietaryRestrictions: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  adoptedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: false,
    default: null,
  },
});

const AddPet = mongoose.model('pets', addPetSchema);

module.exports = { AddPet };
