const ApiError = require('../../utils/ApiError');
const User = require('../auth/auth.model');

const getAllUsers = async () => {
  return await User.find().select('-password').lean();
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password').lean();
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const createUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'Email already exists');
  }

  // Generate default password if not provided (for admin-created users)
  const userPassword = (password && password.trim()) ? password : `TempPass${Date.now()}`;

  const user = await User.create({
    name,
    email,
    password: userPassword,
    role: role || 'user',
  });

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

const updateUser = async (userId, userData) => {
  const { name, email, role } = userData;

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

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  
  await user.save();

  const updatedUser = user.toObject();
  delete updatedUser.password;
  return updatedUser;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
