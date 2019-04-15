
exports.up = function(knex) {
  return knex.schema.createTable('sequences', sequences => {
    sequences.increments('seq_id')
      .primary();

    sequences.string('sequence');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sequences');
};