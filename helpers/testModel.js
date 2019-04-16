const db = require('../database/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById
};

async function insert(hobbit) {
  const [lig_id] = await db('ligands').insert(hobbit);

  return db('ligands')
    .where({ lig_id })
    .first();
}

// async function update(test){
//     const [lig_id] = await db('ligands').update(test);
//     return db("ligands")
//       .where({ lig_id })
//       .update(test)

// }

function update(lig_id, changes){
   // console.log('tuqhan:', changes)
    return db("ligands")
      .where({ lig_id })
      .update(changes)
      
      //.then(_ => getAll());
  };
   

function remove(id) {
  return null;
}

function getAll() {
  return db('ligands');
}

function findById(id) {
  return null;
}
