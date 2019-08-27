
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activity')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('activity').insert([
        {users_act_id: 1, activity: "exercise", engagement: 8, energize: 10},
        {users_act_id: 1, activity: "swimming", engagement: 5, energize: 8},
      ]);
    });
};
