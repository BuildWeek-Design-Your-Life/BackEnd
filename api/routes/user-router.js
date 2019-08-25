const server = require('express').Router();

const Users = require('../models/user-model');
const secrets = require('../../config/secrets')
const restricted = require('../../middleware/authenticate');


// used for getting all users and users by id

server.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
});

server.get('/users/:id', restricted, async(req, res) => {
    try {
        const id = await Users.findById(req.params.id)
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({message: 'No user by that id was found.'})
        }
    }
    catch (err) {
        res.status(500).json({message: 'server error'})
    }
});


module.exports = server