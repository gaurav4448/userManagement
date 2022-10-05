const { validationResult } = require('express-validator');

const Admin = require('../models/admin');


// get all data
module.exports.fetchAll = async (req, res, next) => {
    try {
        const [allUsers] = await Admin.fetchAll();
        res.status(200).json(allUsers);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

// delete user
module.exports.deleteUser = async (req, res, next) => {
    try {
        const deleteResponse = await Admin.deleteUser(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}