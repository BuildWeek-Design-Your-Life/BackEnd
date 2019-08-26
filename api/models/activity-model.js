const db = require('../../database/dbConfig');

module.exports = {
    findAllAct,
    findUserAct,
    add,
    updateAct
};

function findAllAct() {
    return db('activity').select('id', 'users_act_id', 'activity', 'engagement', 'energize');
}

function findUserAct(id) {
    return db('activity')
        .where({'users_act_id':id})
}

function add(body) {
    return db('activity')
        .insert(body)
}

function updateAct(id, changes) {
    return db('activity')
        .where({id})
        .update(changes)
}