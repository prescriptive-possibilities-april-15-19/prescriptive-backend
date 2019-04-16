const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Proteins = require('../database/')["Proteins"]

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req,res) => {
  res.status(200).json({ 
    prescriptionsReady: false,
    prescriptionsCalledIn: false })
})

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