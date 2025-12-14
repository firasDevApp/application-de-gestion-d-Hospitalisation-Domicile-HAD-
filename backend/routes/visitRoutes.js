const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authJwt');
const visitController = require('../controllers/visitController');

router.post('/demande-visit', verifyToken, visitController.demandeVisit);

module.exports = router;
