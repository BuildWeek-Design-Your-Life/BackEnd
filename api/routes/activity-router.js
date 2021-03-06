const server = require('express').Router();

const Users = require('../models/activity-model');
const secrets = require('../../config/secrets')
const restricted = require('../../middleware/authenticate');

// STILL NEED TO ADD A PUT AND DELETE REQUEST
// SHOULD MAKE GET REQUEST TO FIND BY SPECIFIC ID IN DB, NOT JUST A USERS_ACT_ID

// return all activity logs
server.get('/', restricted, (req, res) => {
    Users.AllAct()
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
        const id = await Users.UserAct(req.params.id)
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

// update an activity log based off params id. Params id refers to the object id inside the array
server.put('/:id', restricted, async(req, res) => {
    try {
        const { id } = req.params;
        let {users_act_id, activity, engagement, energize} = req.body
        if ( id && req.body ) {
            const store = await Users.UserAct(id)
            const updatedLog = await Users.update(id, req.body)
            res.status(201).json({message: 'Update Successful!'})
        } else {
            res.status(404).json({message: 'May be missing something in your body or bad id'})
        }
    }
    catch (err) {
        res.status(500).json({message: 'server error'})
    }
});

server.delete('/:id', async (req, res) => {    
    try {
        const { id } = req.params;
        const deleted = await Users.remove(id);
        if (deleted) {
            res.json({ removed: deleted });
        } else {
            res.status(404).json({ message: 'Bad ID, or client error' });
        }
    } catch (err) {
    res.status(500).json({ message: `Failed to delete log ${id}` });
    }
});

module.exports = server