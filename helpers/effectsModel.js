const database = require('../database/dbConfig.js');

module.exports = {
  update,
  searchByFK
}

function update(id, changes) {

}

function searchByFK(id) {
  const { lig_id, seq_id, effect_id } = id;
  if (typeof id !== 'object') {
    return null
  } else {

    if (lig_id !== undefined && seq_id === undefined) {
      return database('lig2seq')
        .where('lig_id', lig_id)
        .innerJoin('sequences', { 'lig2seq.seq_id':'sequences.seq_id' })

    } else if (seq_id !== undefined && lig_id === undefined) {
      return database('lig2seq')
        .where('seq_id', seq_id)
        .innerJoin('ligands', { 'lig2seq.lig_id':'ligands.lig_id' })

    } else if (seq_id !== undefined && lig_id !== undefined) {
      return database('lig2seq')
        .where('lig_id', lig_id)
        .where('seq_id', seq_id);

    } else if (effect_id) {
      return database('lig2seq')
        .where('effect_id', effect_id)
        .innerJoin('sequences', { 'lig2seq.seq_id':'sequences.seq_id' })
        .innerJoin('ligands', { 'lig2seq.lig_id':'ligands.lig_id' });
    } else {
      return null;
    }
  }
}