const database = require('../database/dbConfig.js');
const table = 'sequences';

module.exports = {
  insert,
  update,
  remove,
  findById,
  searchSequences
};

async function insert(row) {
  const [seq_id] = await database(table).insert(row);

  return seq_id;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

async function findById(id) {

  return database(table).where({ 'seq_id': id });
}

async function searchSequences(query) {
  if (typeof query !== 'string') {
    return null;
  } else if (query.length < 2) {
    return null;
  } else {
    const matches = await database(table).where('sequence', query);

    return matches;
  }
}