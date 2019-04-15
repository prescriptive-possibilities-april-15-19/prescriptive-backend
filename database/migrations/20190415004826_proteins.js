
exports.up = function(knex) {
  return knex.schema.createTable('proteins', proteins => {
    proteins.string('_id').unique().notNullable();

    proteins.json('fasta_seqs');

    proteins.string('citation_authors');

    proteins.string('deposition_date');

    proteins.string('expMethod');

    proteins.string('keywords');

    proteins.date('last_modification_date');

    proteins.integer('nr_atoms');

    proteins.integer('nr_entities');

    proteins.integer('nr_residues');

    proteins.string('pubmedId');

    proteins.date('release_date');

    proteins.decimal('resolution');

    proteins.string('status');

    proteins.string('structure_authors');

    proteins.string('title');

    // proteins.('Ligand IDs')
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('proteins');
};


// {
//  "_id": "176L",
//  "fasta_seqs": {
//   "A": 6,
//   "B": 6
//  },
//  "citation_authors": "Zhang, X.J., Wozniak, J.A., Matthews, B.W.",
//  "deposition_date": "1995-03-24",
//  "expMethod": "X-RAY DIFFRACTION",
//  "keywords": "HYDROLASE (O-GLYCOSYL)",
//  "last_modification_date": "2017-11-29",
//  "nr_atoms": 2615,
//  "nr_entities": 1,
//  "nr_residues": 328,
//  "pubmedId": "7616572",
//  "release_date": "1995-07-10",
//  "resolution": 2.2,
//  "status": "CURRENT",
//  "structure_authors": "Zhang, X.-J., Weaver, L., Dubose, R., Matthews, B.W.",
//  "title": "PROTEIN FLEXIBILITY AND ADAPTABILITY SEEN IN 25 CRYSTAL FORMS OF T4 LYSOZYME",
//  "Ligand IDs": [
//   "5cb0ce6793db9d797693dd70",
//   "5cb0ce6793db9d797693dd7f",
//   "5cb0ce6793db9d797693dd80",
//   "5cb0ce6793db9d797693dd85",
//   "5cb0ce6793db9d797693dd86"
//  ]
// }