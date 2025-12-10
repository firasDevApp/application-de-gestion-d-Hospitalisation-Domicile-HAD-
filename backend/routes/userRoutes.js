const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authJwt');

// Routes accessibles seulement par admin
router.get('/', [verifyToken, isAdmin], userController.getAllUsers);
router.get('/:id', [verifyToken, isAdmin], userController.getUserById);
router.put('/:id', [verifyToken, isAdmin], userController.updateUser);
router.delete('/:id', [verifyToken, isAdmin], userController.deleteUser);
router.post('/:id/roles', [verifyToken, isAdmin], userController.updateUserRoles);

module.exports = router;