const Ajv = require('ajv').default;
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const userValidate = (req, res, next) => {
  console.log(req.body);
  const schema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        errorMessage: { type: 'firstName must be a string' },
      },
      lastName: { type: 'string' },
      email: {
        type: 'string',
        format: 'email',
        errorMessage: {
          format: 'Invalid email format',
        },
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 12,
        description: 'Password is required',
      },
      phoneNumber: { type: 'integer' },
    },
    required: ['firstName', 'lastName', 'email', 'password', 'phoneNumber'],
  };

  console.log(new Date().getFullYear() - 100);

  const validateUser = ajv.compile(schema);

  const valid = validateUser(req.body);

  if (valid) {
    return next();
  }

  res.status(200).json({ valid, errors: validateUser.errors });
};

module.exports = { userValidate };
