const Ligands = require('../helpers/ligandsModel.js');
const Effects = require('../helpers/effectsModel.js');
const router = require('express').Router();

router.get('/', async (req,res) => {
  const { smiles, seq_id, lig_id } = req.headers;
  console.log(smiles);
  console.log(typeof smiles);

  if (!smiles && lig_id === undefined) /* || !req.headers["PubChem CID"] */ {
    res.status(400).json({ message: "Invalid query, no query input provided." });
  } else if (lig_id !== undefined) {
    try {
      const knownEffects = await Effects.searchByFK({ seq_id, lig_id });
  
      if (knownEffects.length === 0) {
        res.status(404).json({ message: "No data found." });
      } else {
        res.status(200).json({ data: [...knownEffects] })
      }
    } catch(error) {
      res.status(500).json({ message: "Database inaccessible." })
    }
             
  } else if (smiles.length <4) {
    res.status(400).json({ message: "Insufficient data to find matches. Please provide more input." });
  } else {
    try {
      const moreSMILES = await Ligands.searchSMILES(smiles);

      if (moreSMILES.length === 0) {
        res.status(404).json({ message: "No data found." });
      } else {
        res.status(200).json({ data: [...moreSMILES] })
      }

    } catch(error) {
      res.status(500).json({ message: "Database inaccessible." })
    }
  }
});

module.exports = router;
