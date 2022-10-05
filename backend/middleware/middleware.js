const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretfortoken');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Not authenticated!');
        err.statusCode = 401;
        throw err;
    }
    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
}


// // required token
// function requiredToken(req, res, next) {
//     let headers = req.headers["token"];

//     if(typeof headers !== undefined && headers !== "") {
//         req.token = headers;
//         next();
//     } else {
//         res.send({
//             status: false,
//             message: 'token required!'
//         })
//     }
// }


// // verifying token
// function verifyToken(token) {
//     return jwt.verify(token, 'privatekey', (err, result) => {
//         if (err) {
//             return { status: false };
//         } else {
//             return { status: true };
//         }

//     })
// }

// module.exports = {
//     requiredToken,
//     verifyToken
// }