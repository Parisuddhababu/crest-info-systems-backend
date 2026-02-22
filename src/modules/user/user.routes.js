const express = require('express');
const userController = require('./user.controller');
const userValidation = require('./user.validation');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/', userController.getAllUsers);
router.get('/:id', userValidation.validateObjectId, userController.getUserById);
router.post('/', userValidation.createUserValidation, userController.createUser);
router.put('/:id', userValidation.validateObjectId, userValidation.updateUserValidation, userController.updateUser);
router.delete('/:id', userValidation.validateObjectId, userController.deleteUser);

module.exports = router;
