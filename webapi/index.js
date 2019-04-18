const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Proteins = require('../database/')["Proteins"]
const Ligands = require('../helpers/ligandsModel.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/sequences', sequencesRouter);
server.use('/ligands', ligandsRouter);


server.get('/', (req,res) => {
  res.status(200).json({ 
    prescriptionsReady: false,
    prescriptionsCalledIn: false })
})

// *** GET Endpoints for ligands, sequences tables: *** 
server.get('/ligands/smiles', async (req, res) => {
  const verifyString = req.headers
  const rows = await Ligands.searchSMILES(verifyString === 4);


  res.status(200).json(rows);
});

// server.post('/ligands/smiles', (req,res) => {
//   const body = req.body;
//   if(body.SMILES) {
//     db.insert(body)
//       .then(id => {
//         res.status(201).json(id) 
//       })
//       .catch(err => {
//         res.status(500).json({message: 'Failed to add SMILE'})
//       })
//   } else {
//     res.status(400).json({message: 'Missing SMILES '})
//   }
// })


server.post('/', async (req,res) => {
  const protein = req.body;

  if (!req.body["_id"]) {
    res.status(400).json({ message: "No." })
  } else {
    const newProtein = await Proteins.insert(protein);
    res.status(200).json(newProtein[0])
  }
})

module.exports = server;
