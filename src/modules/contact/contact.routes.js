const express = require('express');
const contactController = require('./contact.controller');
const contactValidation = require('./contact.validation');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

const router = express.Router();

// CREATE - Public endpoint (anyone can submit contact form)
router.post('/', contactValidation.createContactValidation, contactController.createContact);

// GET - Admin only (to view all contact messages)
router.get('/', authMiddleware, roleMiddleware('admin'), contactController.getAllContacts);

module.exports = router;
