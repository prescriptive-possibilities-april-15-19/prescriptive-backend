
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sequences').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sequences').insert([
        {seq_id: 1, sequence: 'rowValue1'},
        {seq_id: 2, sequence: 'rowValue2'},
        {seq_id: 3, sequence: 'rowValue3'}
      ]);
    });
};
