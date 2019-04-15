const Proteins = require('./dbConfig.js')('proteins');
const Ligands = require('./ligandKnex.js');

module.exports = {
  Proteins,
  Ligands
}
// recommended import: const (ObjectName) = require('../database')["ObjectName"]