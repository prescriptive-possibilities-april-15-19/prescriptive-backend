const Sequences = require('../helpers/sequencesModel.js');
const router = require('express').Router();

router.get('/', async (req,res) => {
  const { sequence } = req.headers;

  if (!sequence) {
    res.status(400).json({ message: "Invalid query, no query input provided." });
  } else if (sequence.length <2) {
    res.status(400).json({ message: "Insufficient data to find matches. Please provide more input." });
  } else {
    try {
      const sequenceMatch = await Sequences.searchSequences(sequence);

      if (sequenceMatch === []) {
        res.status(404).json({ message: "No data found." });
      } else {
        res.status(200).json({ ... sequenceMatch })
      }

    }
    catch(error) {
      res.status(500).json({ message: "Database inaccessible." })
    }
  }
});

module.exports = router;