const db = require('../../database/dbConfig');

module.exports = {
    AllReflect,
    UserRefl,
    add,
    update,
    remove,
};

function AllReflect() {
    return db('reflect').select('id', 'users_ref_id', 'trends', 'insights', 'summary');
}

function UserRefl(id) {
    return db('reflect')
        .where({'users_ref_id':id})
}

function add(body) {
    return db('reflect')
        .insert(body)
}

function update(id, changes) {
    return db('reflect')
        .where({id})
        .update(changes)
}

function remove(id) {
    return db('reflect').where({ id }).delete(id)
}