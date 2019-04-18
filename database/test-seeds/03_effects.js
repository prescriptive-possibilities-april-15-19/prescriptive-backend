
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lig2seq').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('lig2seq').insert([
        {effect_id:1, lig_id: 1, seq_id: 1},
        {effect_id:2, lig_id: 1, seq_id: 2},
        {effect_id:3, lig_id: 1, seq_id: 3},
        {effect_id:4, lig_id: 2, seq_id: 3},
        {effect_id:5, lig_id: 2, seq_id: 5},
        {effect_id:6, lig_id: 3, seq_id: 6},
        {effect_id:7, lig_id: 3, seq_id: 7},
        {effect_id:8, lig_id: 3, seq_id: 7},
        {effect_id:9, lig_id: 5, seq_id: 7},
        {effect_id:10, lig_id: 6, seq_id: 7},
        {effect_id:11, lig_id: 7, seq_id: 7},
        {effect_id:12, lig_id: 8, seq_id: 7},
        {effect_id:13, lig_id: 9, seq_id: 7}
      ]);
    });
};
