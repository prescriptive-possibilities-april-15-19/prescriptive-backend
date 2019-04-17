const request = require('supertest');
const server = require('./index.js');

it('should run in a test environment', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

describe('/ligands', () => {
  describe('HTTP GET', () => {

    it('should respond with 200 OK for a valid request', async () => {
      const response = await request(server)
        .get('/ligands')
        .set('SMILES', 'rowV')
        .set('Accept', 'application/json')

      expect(response.status).toEqual(200);
   })

    it('should refuse a non-entry', async () => {
      const response = await request(server)
        .get('/ligands')
        .set('SMILES', '')
        .set('Accept', 'application/json')

      expect(response.status).toEqual(400);
    })

    it('should refuse a too-small search', async () => {
      const response = await request(server)
        get('/ligands')
        .set('SMILES', 'row')
        .set('Accept', 'application/json')

      expect(response.status).toEqual(400);
    })

    it('should 404 on a not-found request', async () => {
      const response = await request(server)
        .get('/ligands')
        .set('SMILES', 'whether tis nobler of the mind')
        .set('Accept', 'application/json')

      expect(response.status).toEqual(404);
    })


  // it('should refuse a string below the minimum length of 4', async () => {
  //   const response = await Ligands.searchSMILES('tes');

  //   expect(response).toBe(null);
  // })

  // it('should refuse an array, even if it has a length of 4', async () => {
  //   const response = await Ligands.searchSMILES(['is','this','a','joke?']);

  //   expect(response).toBe(null);
  // })

  // it('should return an empty array if the query is valid but not present', async () => {
  //   const response = await Ligands.searchSMILES('To be or not to be?');

  //   expect(response).toEqual([])
  // })

  // it('should return an array if it finds a partial match', async () => {

  //   const response = await Ligands.searchSMILES('rowV');

  //   expect(response.length).toBeGreaterThan(0);
  // })
  });
});