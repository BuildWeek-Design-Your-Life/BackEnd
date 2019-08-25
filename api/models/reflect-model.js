const db = require('../../database/dbConfig');

module.exports = {
    findAllReflect,
    findUserRefl,
    add,
};

function findAllReflect() {
    return db('reflect').select('id', 'users_ref_id', 'trends', 'insights', 'summary');
}

function findUserRefl(id) {
    return db('reflect')
        .where({'users_ref_id':id})
}

function add(body) {
    return db('reflect')
        .insert(body)
}