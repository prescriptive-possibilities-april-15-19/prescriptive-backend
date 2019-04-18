
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ligands').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('ligands').insert([
        {lig_id: 1, SMILES: 'rowValue1'},
        {lig_id: 2, SMILES: 'rowValue2'},
        {lig_id: 3, SMILES: 'rowValue3'},
        {lig_id: 4, SMILES: 'rowValue4'},
        {lig_id: 5, SMILES: 'rowValue5'},
        {lig_id: 6, SMILES: 'rowValue6'},
        {lig_id: 7, SMILES: 'rowValue7'},
        {lig_id: 8, SMILES: 'rowValue8'},
        {lig_id: 9, SMILES: 'rowValue9'},
        {lig_id: 10, SMILES: 'rowValue10'},
        {lig_id: 11, SMILES: 'rowValue11'},
        {lig_id: 12, SMILES: 'rowValue12'},
        {lig_id: 13, SMILES: 'tazya'}
      ]);
    });
};
