const { User } = require('@models/auth/model.user');

const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData, {
      condition: new dynamoose.Condition().attribute('email').not().exists(),
    });
    return { status: 201, data: newUser };
  } catch (error) {
    if (error.message.includes('The conditional request failed')) {
      return { status: 409, error: 'A user with this email already exists.' };
    }
    return { status: 500, error: 'Error creating user', details: error.message };
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.get(email);
    if (user) {
      return { status: 200, data: user };
    }
    return { status: 404, error: 'User not found' };
  } catch (error) {
    return { status: 500, error: 'Error retrieving user', details: error.message };
  }
};

const listUsers = async () => {
  try {
    const users = await User.scan().exec();
    return { status: 200, data: users };
  } catch (error) {
    return { status: 500, error: 'Error listing users', details: error.message };
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  listUsers,
};