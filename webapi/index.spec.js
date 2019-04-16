const request = require('supertest');
const server = require('./index.js');


describe('index.js', () => {
    describe('GET /', () => {
      it('should respond with 200 OK', () => {
        return request(server)
          .get('/ligands/smiles')
          .then(response => {
            expect(response.status).toBe(200);
          });
      });
 
    });
});
