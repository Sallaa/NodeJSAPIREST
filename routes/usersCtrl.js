// Imports

var bcrypt = require('bcrypt');
<<<<<<< HEAD
var jwt = require('jsonwebtoken');
=======
var jwtUtils = require('../utils/jwt.utils');
>>>>>>> e2a2804... Added Authentification to the API
var models = require('../models');

// Routes
module.exports = {
    register: function(req, res){
        
        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        if (email == null || username == null || password == null){
            return res.status(400).json({ 'error' : 'missing parameters'});
        }

        models.User.findOne({
            attributes: ['email'],
            where: {email: email }
        })
        .then(function(userFound){
            if(!userFound){

                bcrypt.hash(password, 5, function(err, bcryptedPassword){

                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
<<<<<<< HEAD
                        })
=======
                        });
>>>>>>> e2a2804... Added Authentification to the API
                    })
                    .catch(function(err){
                        return res.status(500).json({'error': 'cannot add user'});
                    });

                });

                

            } else {
                return res.status(409).json({'error' : 'user already exists'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': 'unable to verify user'});
        });

    },
    login: function(req, res){
<<<<<<< HEAD
        // TODO: To implement
=======
         
        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null){
            return res.status(400).json({ 'error' : 'missing parameters'});
        }

        models.User.findOne({
            where: {email: email }
        })
        .then(function(userFound){
            if(userFound){

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({'error' : 'invalid password'});
                    }
                });

            } else {
                return res.status(409).json({'error' : 'user doesn\'t exist'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error': 'unable to verify user'});
        });
>>>>>>> e2a2804... Added Authentification to the API
    }
};