const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const jwt = require('jsonwebtoken');


// signup or registering a new user
module.exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return


    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            fullname,
            email,
            password: hashedPassword,
            type
        }

        const result = User.save(userDetails);

        res.status(201).json({ message: 'User registered!' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


// logging in a user
module.exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find(email);

        if (user[0].length !== 1) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(password, storedUser.password);
        if (!isEqual) {
            const error = new Error('Wrong password!')
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: storedUser.email,
                userId: storedUser.id
            }, 'secretfortoken',
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: storedUser.id })

    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

    //     let email = req.body.email;
    //     let password = req.body.password;

    //     // check mail
    //     let emailCheck = `SELECT * FROM taskUser WHERE email = '${email}'`;
    //     db.query(emailCheck, async (err, result) => {
    //         if (err) throw err;

    //         if (result.length > 0) {
    //             let data = {
    //                 fullname: result[0].fullname,
    //                 email: result[0].email,
    //                 mobile: result[0].mobile,
    //                 type: result[0].type
    //             }

    //             // check password with the hash stored
    //             let decryptPassword = await bcrypt.compare(password, result[0].password);
    //             console.log(decryptPassword, 'real password');
    //             if (decryptPassword === true) {
    //                 const token = jwt.sign({ data }, 'privatekey');

    //                 res.send({
    //                     status: true,
    //                     token: token,
    //                     result: data,
    //                     message: 'User logged In...'
    //                 })
    //             } else {
    //                 res.send({
    //                     status: false,
    //                     message: 'Incorrect password!'
    //                 })
    //             }
    //         } else {
    //             res.send({
    //                 status: false,
    //                 message: 'Invalid Email!'
    //             })
    //         }
    //     })
}


// // get all data API
// module.exports.allUser = (req, res) => {
//     console.log(req.token, 'req Token##');
//     // check verifyToken
//     let checkToken = middleware.verifyToken(req.token);

//     if (checkToken.status) {
//         let qr = 'SELECT * FROM taskUser';

//         db.query(qr, (err, result) => {
//             if (err) throw err;
//             if (result.length > 0) {
//                 res.send({
//                     status: true,
//                     data: result
//                 })
//             } else {
//                 res.send({
//                     status: false,
//                     message: 'Data not found'
//                 })
//             }
//         });
//     } else {
//         res.send({
//             status: false,
//             message: 'Invalid token!'
//         })
//     }
// }


// // get single user
// module.exports.singleUser = (req, res) => {
//     let uid = req.params.id;

//     let checkToken = middleware.verifyToken(req.token);
//     if (checkToken.status) {
//         let qr = `SELECT * FROM taskUser WHERE id=${uid}`;

//         db.query(qr, (err, result) => {
//             if (err) {
//                 console.log(err, 'error!')
//             }
//             if (result.length > 0) {
//                 res.send({
//                     message: 'single data',
//                     data: result
//                 })
//             } else {
//                 res.send({
//                     message: 'Data not found!'
//                 })
//             }
//         })
//     } else {
//         res.send({
//             status: false,
//             message: 'Invalid token!'
//         })
//     }
// }

// // update a user
// module.exports.updateUser = async (req, res) => {
//     console.log(req.body, 'update data');

//     let uid = req.params.id;
//     let fullname = req.body.fullname;
//     let email = req.body.email;
//     let mobile = req.body.mobile;
//     let password = req.body.password;
//     let type = req.body.type;

//     let encryptPassword = await bcrypt.hash(password, 10);

//     // verifying token
//     let checkToken = middleware.verifyToken(req.token);
//     if (checkToken) {
//         let qr = `UPDATE taskUser SET fullname = '${fullname}', email = '${email}', password = '${encryptPassword}', mobile = ${mobile}, type = '${type}' WHERE id = ${uid}`;

//         db.query(qr, (err, result) => {
//             if (err) throw err;
//             res.send({
//                 message: 'Data updated...'
//             })
//         })
//     } else {
//         res.send({
//             status: false,
//             message: 'Invalid token!'
//         })
//     }
// }

// // delete single user
// module.exports.deleteUser = (req, res) => {
//     let uid = req.params.id;

//     let checkToken = middleware.verifyToken(req.token);
//     if (checkToken.status) {
//         let qr = `DELETE FROM taskUser WHERE id = ${uid}`;

//         db.query(qr, (err, result) => {
//             if (err) throw err;
//             res.send({
//                 message: 'Data successfully deleted...'
//             })
//         })
//     } else {
//         res.send({
//             status: false,
//             message: 'Invalid token!'
//         })
//     }
// }









