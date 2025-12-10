const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifySignUp = require('../middleware/verifySignUp');
const { verifyToken } = require('../middleware/authJwt');

router.post(
  '/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authController.signup
);

router.post('/signin', authController.signin);
router.post('/change-password', [verifyToken], authController.changePassword);

module.exports = router;