const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID',
    });
  }
  next();
};

const createUserValidation = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  next();
};

const updateUserValidation = (req, res, next) => {
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      success: false,
      error: 'At least one field (name or email) is required',
    });
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }
  }

  next();
};

module.exports = {
  validateObjectId,
  createUserValidation,
  updateUserValidation,
};
