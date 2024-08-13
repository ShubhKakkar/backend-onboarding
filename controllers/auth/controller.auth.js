const User = require('@models/auth/model.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  const { email, password } = userData;
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

  if (!email || !password) {
    return { status: 400, error: 'Email and password are required.' };
  }

  if (password.length < 6 || password.length > 50) {
    return { status: 400, error: 'Password must be between 6 and 50 characters.' };
  }

  try {
    const existingUser = await User.get(email);

    if (existingUser) {
      return { status: 409, error: 'A user with this email already exists.' };
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hash
    });

    const savedUser = await newUser.save();

    return { status: 201, data: savedUser };
  } catch (error) {
    return { status: 500, error: 'Error creating user', details: error.message };
  }
};

const loginUser = async (credentials) => {
  const { email, password } = credentials;
  if (!email || !password) {
    return { status: 400, error: 'Email and password are required.' };
  }
  try {
    const user = await User.get(email);

    if (!user) {
      return { status: 401, error: 'Invalid email or password.' };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { status: 401, error: 'Invalid email or password.' };
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { status: 200, data: { token } };
  } catch (error) {
    return { status: 500, error: 'Error logging in', details: error.message };
  }
}

module.exports = {
  createUser,
  loginUser
};