const db = require('../database/dbConfig.js');
const testModel = require('./testModel.js');

// returns 201
// insert the hobbit
describe('test model', () => {
  beforeEach(async () => {
    await db('ligands').truncate(); 
  });

  describe('insert()', () => {
    it('should insert the provided hobbits', async () => {
      await testModel.insert({ SMILES: 'gaffer' });
      await testModel.insert({ SMILES: 'aragorn' });
      await testModel.insert({ SMILES: 'gandalf' });

      const result = await db('ligands'); 
      expect(result).toHaveLength(3);
    });

    it('should insert the provided hobbit', async () => {
      let test = await testModel.insert({ SMILES: 'tazya' });
      expect(test.SMILES).toBe('tazya');

      test = await testModel.insert({ SMILES: 'tazya' });
      expect(test.SMILES).toBe('tazya');
    });
  });
});
