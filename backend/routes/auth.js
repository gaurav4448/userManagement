const express = require('express');

const { body } = require('express-validator');

// const db = require('../util/database');
// const middleware = require('../middleware/middleware');
const authController = require('../controller/auth');
const User = require('../models/user');

const router = express.Router();


// check database connection
// db.connect(err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Database connected...');
//     }
// })

// home route
// router.get('/home', controller.home);

// signup route
router.post('/signup',
    [
        body('fullname').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.')
            .custom(async (email) => {
                const user = await User.find(email);
                if (user[0].length > 0) {
                    return Promise.reject('Email already exists!')
                }
            }).normalizeEmail(),
        body('password').trim().isLength({ min: 5 }),
        body('type').trim().not().isEmpty()
    ], authController.signup);
    

// // login route
router.post('/login', authController.login);

// // get all data route
// router.get('/user', middleware.requiredToken, controller.allUser);

// // get single data
// router.get('/user/:id', middleware.requiredToken, controller.singleUser);

// // update data
// router.put('/user/:id', middleware.requiredToken, controller.updateUser);

// // delete single data
// router.delete('/user/:id', middleware.requiredToken, controller.deleteUser);




module.exports = router;