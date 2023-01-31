const { User } = require('../models/userModel');
const fs = require('fs');

const addPet = async (req, res) => {
  const { userId } = req;

  fs.writeFileSync('mascota.pdf', 'Hola me cree un archivo');
  const keys = JSON.parse(fs.readFileSync(`${__dirname}/../google.json`));

  fs.mkdirSync(`${__dirname}/../uploads`);
  console.log(keys.email);

  console.log(req.path);

  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password'] },
  });

  res.status(200).json({ user });
};

module.exports = { addPet };
