const express = require('express');

const adminController = require('../controller/admin');

const authMiddleware = require('../middleware/middleware');


const router = express.Router();

// fetch all data
router.get('/admin', authMiddleware, adminController.fetchAll);

// // login route
router.delete('/:id', authMiddleware, adminController.deleteUser);



module.exports = router;