const server = require('express').Router();

const Users = require('../models/activity-model');
const secrets = require('../../config/secrets')
const restricted = require('../../middleware/authenticate');

// STILL NEED TO ADD A PUT AND DELETE REQUEST
// SHOULD MAKE GET REQUEST TO FIND BY SPECIFIC ID IN DB, NOT JUST A USERS_ACT_ID

// return all activity logs
server.get('/', restricted, (req, res) => {
    Users.findAllAct()
        .then(act => {
            res.json(act);
        })
        .catch(err => {
            res.status(500).json({message: 'server error'})
        })
});

//return user specific logs
server.get('/:id', restricted, async(req, res) => {
    try {
        const id = await Users.findUserAct(req.params.id)
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({message: 'No activity log was found by that id'})
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
        let {users_act_id, activity, engagement, energize} = req.body
        if (req.body) {
            const newActLog = await Users.add(req.body)
            //res.status(201).json({message: 'Post Successful!' , new_Activity_Log: newActLog}) //supposed to return id of users_act_id
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