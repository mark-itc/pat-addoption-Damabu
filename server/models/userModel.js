const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: false,
  },

  savePets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'pets',
    },
  ],

  rol: {
    type: String,
    required: true,
    default: 'user',
  },
});

const User = mongoose.model('users', userSchema);

module.exports = { User };

/*const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phone:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };*/
