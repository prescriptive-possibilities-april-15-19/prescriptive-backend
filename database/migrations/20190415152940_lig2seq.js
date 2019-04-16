
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lig2seq', table => {
    table.increments('effect_id')
      .primary();

    table.integer('lig_id')
        .unsigned()
        .notNullable()
        .references('lig_id')
        .inTable('ligands')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    table.integer('seq_id')
      .unsigned()
      .notNullable()
      .references('seq_id')
      .inTable('sequences')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lig2seq');
};
