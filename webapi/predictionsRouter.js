const Effects = require('../helpers/effectsModel.js');
const router = require('express').Router();

router.post('/update/', async (req,res) => {
  const { effect_id, bind_chance } = req.body;

  try {
    const effect = await Effects.updateBindChance(effect_id, bind_chance);

    res.status(200).json({ message: "Cool!" })
  } catch(error) {
    res.status(500).json({ message: "Broke on my end." })
  }
});

module.exports = router;