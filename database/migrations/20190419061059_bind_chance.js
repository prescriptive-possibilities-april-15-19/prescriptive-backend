
exports.up = function(knex) {
  return knex.schema.hasTable('lig2seq').then(exists => {
    console.log('lig2seq: ', exists);
  if (exists) {
    return knex.schema.table('lig2seq', table => {
      table.float('bind_chance')
    })}
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('ligseq', table => {
    table.dropColumn('bind_chance');
  });
};
