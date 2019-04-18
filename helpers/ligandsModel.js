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

function findById(id) {
  return database(table).where({ 'lig_id': id });
}

function searchSMILES(query, page=0) {

  if (typeof query !== 'string') {
    return null;
  } else if (query.length < 4) {
    return null;
  } else {
    return database(table)
      .where('SMILES', 'like', `%${query}%`)
      .limit(10).offset(page*10);
  }
}