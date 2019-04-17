const router = require('express').Router();

router.get('/', async (req,res) => {
  console.log(req.headers.smiles)
});

module.exports = router;