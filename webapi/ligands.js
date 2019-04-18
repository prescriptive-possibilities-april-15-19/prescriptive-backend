const Ligands = require('../helpers/ligandsModel.js');
const router = require('express').Router();

router.get('/', async (req,res) => {
  const { smiles } = req.headers;
  console.log(req.headers);
  // const CID = req.headers["PubChem CID"]


  if (!smiles /* || !req.headers["PubChem CID"] */) {
    res.status(400).json({ message: "Invalid query, no query input provided." });
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

    }
    catch(error) {
      res.status(500).json({ message: "Database inaccessible." })
    }
  }
});

module.exports = router;