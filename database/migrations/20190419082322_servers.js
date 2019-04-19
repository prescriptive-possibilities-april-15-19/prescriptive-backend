
exports.up = function(knex) {
  return knex.schema.createTable('servers', servers => {
    servers.increments('server_id').primary();

    servers.string('name').unique();

    servers.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('servers');
};
