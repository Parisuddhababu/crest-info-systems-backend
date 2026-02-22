const ApiError = require('../../utils/ApiError');
const User = require('../auth/auth.model');

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const updateProfile = async (userId, userData) => {
  const { name, email } = userData;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'Email already exists');
    }
  }

  Object.assign(user, { name, email });
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  getProfile,
  updateProfile,
};
