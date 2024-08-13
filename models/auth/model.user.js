const dynamoose = require('dynamoose');
const validator = require('validator');

const userSchema = new dynamoose.Schema({
  email: {
    type: String,
    required: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
      return true;
    },
    hashKey: true,
    index: {
      global: true,
      project: true,
      name: 'EmailIndex',
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