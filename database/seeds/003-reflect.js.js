
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reflect')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reflect').insert([
        {users_ref_id: 1, trends: "I felt better after exercising", insights: "I feel motivated to do more each day if I exercise", summary: "Based off my trends and insights, I want to keep this routine up!"},
        {users_ref_id: 1, trends: "I can hold my breath longer", insights: "I like my lungs are getting stronger", summary: "My cardio seems to be improving if I swim everyday"},
      ]);
    });
}
