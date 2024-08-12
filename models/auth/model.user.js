const dynamoose = require('dynamoose');
const validator = require('validator');

const userSchema = new dynamoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
    hashKey: true,
    index: {
      global: true,
      name: 'EmailIndex',
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length >= 6 && v.length <= 50,
      message: 'Password must be between 6 and 50 characters long',
    },
  },
}, {
  timestamps: true,
});

module.exports = dynamoose.model('User', userSchema);