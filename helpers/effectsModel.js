const database = require('../database/dbConfig.js');

module.exports = {
  verifyMissing,
  setupPair,
  updateBindChance,
  searchByFK
}

async function setupPair(id) {
  const { lig_id, seq_id, effect_id } = id;

  const doubleCheck = await verifyMissing({ ids });

  if (doubleCheck) {
    return doubleCheck;
  } else {

    const ligand = await database('ligands').where('lig_id', lig_id);
    const sequence = await database('sequences').where('seq_id', seq_id);
    if (ligand.length === 1 && sequence.length === 1) {
      return database('lig2seq').insert({ lig_id, seq_id })
    }
  }
}

async function verifyMissing(id) {
  const { lig_id, seq_id, effect_id } = id;
  if (typeof effect_id === 'number') {
    return database('lig2seq').where('effect_id', effect_id);
  } else {
    const verify = await database('lig2seq').where('lig_id', lig_id).where('seq_id', seq_id);

    if (verify.length > 0) {
      return verify
    } else {
      return false;
    }
  };
}

function updateBindChance(id, bind_chance) {
  if (bindChance > 1) {
    throw "How is a bind chance greater than 100%?"
  } else {
    return database('lig2seq').where('effect_id', id).update({ bind_chance })
  }
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