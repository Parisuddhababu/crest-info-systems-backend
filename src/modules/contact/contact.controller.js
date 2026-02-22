const catchAsync = require('../../utils/catchAsync');
const contactService = require('./contact.service');

const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactService.getAllContacts();
  res.json({
    success: true,
    data: contacts,
  });
});

const createContact = catchAsync(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  res.status(201).json({
    success: true,
    message: 'Contact message submitted successfully',
    data: contact,
  });
});

module.exports = {
  getAllContacts,
  createContact,
};
