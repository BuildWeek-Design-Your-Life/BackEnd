const db = require('../../database/dbConfig');

module.exports = {
    find,
    findById,
};

function find() {
    return db('users').select('id', 'username', 'password', 'email');
}

// function findBy(filter) {
//     return db('users').where(filter);
// }

// function add(user) {
//     return db('users')
//         .insert(user, 'id')
//         .then(ids => {
//             const [id] = ids;
//             return findById(id);
//         });
// }

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}