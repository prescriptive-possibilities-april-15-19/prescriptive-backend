require('dotenv').config();
const db = require('../database/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  findById,
  getAll
};

async function insert(hobbit) {
  const [lig_id] = await db('ligands').insert(hobbit);

  return db('ligands')
    .where({ lig_id })
    .first();
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function findById(id) {
  return null;
}
function getAll() {
  return db('ligands').where('SMILES');
}
