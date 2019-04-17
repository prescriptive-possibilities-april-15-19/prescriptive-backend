const database = require('../database/dbConfig.js');
const table = 'ligands';

module.exports = {
  insert,
  update,
  remove,
  findById,
  searchSMILES
};

async function insert(row) {
  const [lig_id] = await database(table).insert(row);

  return lig_id;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

async function findById(id) {

  return database(table).where({ 'lig_id': id });
}

async function searchSMILES(query) {

  if (typeof query !== 'string') {
    return null;
  } else if (query.length < 4) {
    return null;
  } else {
    const matches = await database(table).where('SMILES', 'like', `%${query}%`);

    return matches;
  }
}