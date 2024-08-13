const dynamoose = require('dynamoose');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

const userSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuidv4
  },
  email: {
    type: String,
    required: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
      return true;
    },
    index: {
      global: true,
      project: true,
      name: 'UserEmailIndex',
      unique: true,
    }
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = dynamoose.model('User', userSchema);