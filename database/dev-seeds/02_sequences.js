
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sequences').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sequences').insert([
        {seq_id: 1, sequence: 'rowValue1'},
        {seq_id: 2, sequence: 'rowValue2'},
        {seq_id: 3, sequence: 'rowValue3'},
        {seq_id: 4, sequence: 'rowValue4'},
        {seq_id: 5, sequence: 'rowValue5'},
        {seq_id: 6, sequence: 'rowValue6'},
        {seq_id: 7, sequence: 'rowValue7'},
        {seq_id: 8, sequence: 'rowValue8'},
        {seq_id: 9, sequence: 'rowValue9'},
        {seq_id: 10, sequence: 'rowValue10'},
        {seq_id: 11, sequence: 'rowValue11'},
        {seq_id: 12, sequence: 'rowValue12'}
      ]);
    });
};
