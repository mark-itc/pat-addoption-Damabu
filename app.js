const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/userRoutes');
const { petRouter } = require('./routes/petRoutes');
const { db } = require('./utils/databases');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/pets', petRouter);

db();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
