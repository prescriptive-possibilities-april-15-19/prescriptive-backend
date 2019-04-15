require('dotenv').config();
const server = require('./webapi/');


server.listen(process.env.PORT || 3142, () => {
  console.log('\n\tServer is hot.')
})