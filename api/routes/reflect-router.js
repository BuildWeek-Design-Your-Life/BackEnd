const server = require('express').Router();

const Users = require('../models/reflect-model');
const secrets = require('../../config/secrets')
const restricted = require('../../middleware/authenticate');

// STILL NEED TO ADD A PUT AND DELETE REQUEST
// SHOULD MAKE GET REQUEST TO FIND BY SPECIFIC ID IN DB, NOT JUST A USERS_REF_ID

// return all reflection logs
server.get('/', restricted, (req, res) => {
    Users.findAllReflect()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
});

//return user specific logs
server.get('/:id', restricted, async(req, res) => {
    try {
        const id = await Users.findUserRefl(req.params.id)
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({message: 'No reflect log was found by that id'})
        }
    }
    catch (err) {
        res.status(500).json({message: 'server error'})
    }
});

// add a reflection log to a user id
// JSON user_ref_id tells which user the log belongs to
server.post('/', restricted, async(req, res) => {
    try {
        // const body = {users_ref_id, trends, insights, summary}
        let {users_ref_id, trends, insights, summary} = req.body
        if (req.body) {
            const newRelfectLog = await Users.add(req.body)
            // res.status(201).json({message: 'Post Successful!' , newRelfectLog: `the new users_ref_id is: ${newRelfectLog}`}) supposed to return id of users_ref_id
            res.status(201).json({message: 'Post Successful!'})
        } else {
            res.status(404).json({message: 'May be missing something in your body'})
        }
    }
    catch (err) {
        res.status(500).json({message: 'server error'})
    }
});

module.exports = server