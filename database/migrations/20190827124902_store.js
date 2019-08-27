

exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            // username and password are required
            // email is optional.
            users
                .string('username', 255)
                .notNullable()
                .unique();
            users
                .string('password', 255)
                .notNullable();
            users
                .string('email', 255)
                .unique();
        })
        .createTable('activity', act => {
            // daily records, activity, engage, energize
            // all are required
            act.increments();

            act.integer('users_act_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            act
                .string('activity', 255)
                .notNullable();
            act
                .integer('engagement')
                .unsigned()
                .notNullable()
                
            act
                .integer('energize')
                .notNullable();
        })
        .createTable('reflect', ref => {
            // weekly, trends, insights, both are required
            // summary is optional
            ref.increments();

            ref.integer('users_ref_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            ref
                .string('trends', 255)
                .notNullable();
            ref
                .string('insights')
                .unsigned()
                .notNullable()
                
            ref
                .string('summary')
        })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('reflect')
    .dropTableIfExists('activity')
    .dropTableIfExists('users')
};