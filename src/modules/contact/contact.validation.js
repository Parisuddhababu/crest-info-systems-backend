const createContactValidation = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, subject, and message are required',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Name must be at least 2 characters long',
    });
  }

  if (subject.trim().length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Subject must be at least 3 characters long',
    });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Message must be at least 10 characters long',
    });
  }

  next();
};

module.exports = {
  createContactValidation,
};
