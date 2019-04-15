
exports.up = function(knex) {
  return knex.schema.createTable('ligands', ligands => {
    ligands.increments('lig_id')
      .primary();

    ligands.integer('PubChem CID');

    ligands.string('SMILES');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ligands');
};
