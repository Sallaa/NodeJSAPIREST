// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'jkehfberes54fbsrlk48fbk5tbf4k5kfb4ek5gfe45lge';

// Exported function
module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        });
    }
};