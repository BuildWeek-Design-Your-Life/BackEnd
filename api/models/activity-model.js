const db = require('../../database/dbConfig');

module.exports = {
    AllAct,
    UserAct,
    add,
    update,
    remove,
};

function AllAct() {
    return db('activity').select('id', 'users_act_id', 'activity', 'engagement', 'energize');
}

function UserAct(id) {
    return db('activity')
        .where({'users_act_id':id})
}

function add(body) {
    return db('activity')
        .insert(body)
}

function update(id, changes) {
    return db('activity')
        .where({id})
        .update(changes)
}

function remove(id) {
    return db('activity').where({ id }).delete(id)
}