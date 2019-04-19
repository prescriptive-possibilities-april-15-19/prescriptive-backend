const Servers = require('../database/dbConfig.js')('servers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

const generateToken = server => {
  const payload = {
    subject: server.server_id,
    name: server.name
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '7d',
  }
  return jwt.sign(payload, secret, options);  
}

router.post('/register', async (req,res) => {
  let { name, password } = req.body;
  const { snake_joke } = req.body;
  const senseOfHumor = process.env.SENSE_OF_HUMOR;

  if (senseOfHumor === undefined) {
    res.status(500).json({ message: "Down." })
  } else if (snake_joke !== senseOfHumor) {
    res.status(400).json({ message: "idgi" })
  } else {
    const hash = bcrypt.hashSync(password, 13);
    password = hash;

    try {
      const success = await Servers.insert({ name, password });
      const newServer = await Servers.where({ name }).first();
      const token = generateToken(newServer);

      res.status(200).json({
        message: "Welcome to the chain gang.",
        token
      })
    } catch(error) {
      res.status(500).json({
        message: "What did your crazy code break now?"
      })
    }
  };
})


router.post('/login', async (req, res) => {
  let { name, password } = req.body;

  try { 
    const matchServer = await Servers.where({ name }).first();

    if (matchServer && bcrypt.compareSync(password, matchServer.password)) {
      const token = generateToken(matchServer);

      res.status(200).json({
        message: "Wait... you! I remember you.",
        token
      })
    } else {
      res.status(401).json({ message: "Wait... you! I... don't remember you?" })
    }
  } catch(error) {
    res.status(500).json({ message: "Come back later." })
  }
})

module.exports = router;