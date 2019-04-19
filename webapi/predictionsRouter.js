const Effects = require('../helpers/effectsModel.js');
const router = require('express').Router();

router.post('/update/', async (req,res) => {
  const { effect_id, bind chance } = req.body;

  try {
    await Effects.updateBindChance({})
  } catch(error) {
    res.status(500).json({ message: "Broke on my end." })
  }
});

module.exports = router;