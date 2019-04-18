const request = require('supertest');
const server = require('./index.js');

it('should run in a test environment', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});


describe('/sequences', () => {

  describe('HTTP GET', () => {
    it('should respond with JSON for a valid request', async () => {
      const response = await request(server)
        .get('/sequences')
        .set('sequence', 'rowV')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(200);
    })

    it('should refuse a non-entry', async () => {
      const response = await request(server)
        .get('/sequences')
        .set('sequence', '')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
    })

    it('should refuse a string below the minimum length of 2', async () => {
      const response = await request(server)
        .get('/sequences')
        .set('sequence', 'r')
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
    })
  // it('should refuse a non-entry', async () => {
  //   const response = await Sequences.searchSequences();

  //   expect(response).toBe(null);
  // })

  // it('should refuse a string below the minimum length of 2', async () => {
  //   const response = await Sequences.searchSequences('a');

  //   expect(response).toBe(null);
  // })

  // it('should refuse an array, even if it has a length of 2', async () => {
  //   const response = await Sequences.searchSequences(['bad','joke']);

  //   expect(response).toBe(null);
  // })
  
  
  });
});