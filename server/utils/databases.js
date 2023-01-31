const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const DB_URL = process.env.CONNECTION_MONGO_DB;
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
