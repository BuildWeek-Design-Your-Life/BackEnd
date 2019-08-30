const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "admin", password: bcrypt.hashSync('password', 12), email: "admin@gmail.com"},
      ]);
    });
};
