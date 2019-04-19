const Sequences = require('../helpers/sequencesModel.js');
const Effects = require('../helpers/effectsModel.js');
const axios = require('axios');
const router = require('express').Router();

router.get('/', async (req,res) => {
  const { sequence, seq_id, lig_id, page, exact } = req.headers;

  if (!sequence && seq_id === undefined) {
    res.status(400).json({ message: "Invalid query, no query input provided." });
  } else if (seq_id !== undefined) {
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

  } else if (sequence.length <2) {
    res.status(400).json({ message: "Insufficient data to find matches. Please provide more input." });
  } else if (exact === true) {
    try {
      const exactSequence = await Ligands.exactSequence(sequence);

      if (knownEffects.length === 0 && seq_id && lig_id) {
        // axios.post()
        res.status(202).json({ message: "Getting prediction." })
      } else if (exactSequence.length === 0) {
        res.status(404).json({ message: "No data found." });
      } else {
        res.status(200).json({ data: [...exactSequence] })
      }
    } catch(error) {
      res.status(500).json({ message: "Database inaccessible." })
    }

  } else {
    try {
      const sequenceMatch = await Sequences.searchSequences(sequence, page);

      if (sequenceMatch.length === 0) {
        res.status(404).json({ message: "No data found." });
      } else {
        res.status(200).json({ data: [...sequenceMatch] })
      }

    }
    catch(error) {
      res.status(500).json({ message: "Database inaccessible." })
    }
  }
});

module.exports = router;