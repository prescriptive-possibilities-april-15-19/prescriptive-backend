
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ligands').del()
    .then(function () {
      // Inserts seed entries
      return knex('ligands').insert([
        {lig_id: 1, SMILES: 'rowValue1'},
        {lig_id: 2, SMILES: 'rowValue2'},
        {lig_id: 3, SMILES: 'rowValue3'},
        {lig_id: 4, SMILES: 'tazya'}
      ]);
    });
};
