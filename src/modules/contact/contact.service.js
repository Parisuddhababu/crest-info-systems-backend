const ApiError = require('../../utils/ApiError');
const Contact = require('./contact.model');

const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 }).lean();
};

const createContact = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  return contact.toObject();
};

module.exports = {
  getAllContacts,
  createContact,
};
