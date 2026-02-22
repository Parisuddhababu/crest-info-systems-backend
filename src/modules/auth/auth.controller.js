const catchAsync = require('../../utils/catchAsync');
const authService = require('./auth.service');
const profileService = require('../user/profile.service');

const signup = catchAsync(async (req, res) => {
  const result = await authService.signup(req.body);
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    ...result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.json({
    success: true,
    message: 'Login successful',
    ...result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = await authService.getMe(req.user.userId);
  res.json({
    success: true,
    data: user,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await profileService.updateProfile(req.user.userId, req.body);
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

module.exports = {
  signup,
  login,
  getMe,
  updateProfile,
};
