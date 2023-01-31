const mongoose = require('mongoose');

const DB_URL =
  'mongodb+srv://daniel:Daniel12345@cluster0.zgwqr10.mongodb.net/pet-db?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
const db = () => {
  mongoose.connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    },
    (err) => {
      if (err) {
        console.log('Error connecting to database');
      } else {
        console.log('Database connected');
      }
    }
  );
};

module.exports = { db };
