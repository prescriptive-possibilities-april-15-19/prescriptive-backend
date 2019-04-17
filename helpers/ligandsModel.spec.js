const Ligands = require('./ligandsModel.js');
const database = require('../database/dbConfig.js');

  beforeAll(async () => {
    await database('ligands').truncate()
    await database.migrate.latest()
      .then(function() {
        return database.seed.run();
      })
  });


it('should run in a test environment', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

describe('table seeding', () => {

  it('should have a few items from seeding the table', async () => {
    const currTable = await database('ligands').select('*');

    expect(currTable.length).toBeGreaterThan(2)
  })

  it('should have an item I put there', async () => {
    const currTable = await database('ligands').select('*');

    expect(currTable).toContainEqual({lig_id: 1, "PubChem CID": null, SMILES: "rowValue1"})
  })
});

describe('searchSMILES', () => {

  it('should refuse a non-entry', async () => {
    const response = await Ligands.searchSMILES();

    expect(response).toBe(null);
  })

  it('should refuse a string below the minimum length of 4', async () => {
    const response = await Ligands.searchSMILES('tes');

    expect(response).toBe(null);
  })

  it('should refuse an array, even if it has a length of 4', async () => {
    const response = await Ligands.searchSMILES(['is','this','a','joke?']);

    expect(response).toBe(null);
  })

  it('should return an empty array if the query is valid but not present', async () => {
    const response = await Ligands.searchSMILES('To be or not to be?');

    expect(response).toEqual([])
  })

  it('should return an array if it finds a partial match', async () => {
    const joke = await Ligands.insert({ SMILES: 'joke' });
    const response = await Ligands.searchSMILES('joke');

    expect(response.length).toBeGreaterThan(0);
  })

});

  describe('insert()', () => {
    it('should insert the provided hobbits', async () => {
      const start = await database('ligands').select('*');

      await Ligands.insert({ SMILES: 'gaffer' });
      await Ligands.insert({ SMILES: 'aragorn' });
      await Ligands.insert({ SMILES: 'gandalf' });

      const end = await database('ligands').select('*');

      expect(start > end);
    });

    it('should insert the provided item', async () => {
      const test = await Ligands.insert({ SMILES: 'tazya' });

      expect(test).toBeTruthy();
    });
  });
  
  // describe("update()", () => {
  //       it("Updates the provided string as expected", async () => {

  //         const updatedUser = await Ligands.update(1, { 'SMILES': "tazya1" });

  //         expect(updatedUser.SMILES).toBe("tazya1");

  //         //expect(test.SMILES).not.toBe(updatedUser.SMILES);
  //       });
  //   it("Does something at all on update, anything", async () => {
  //       const updatedUser = await Ligands.update(1, { 'SMILES': 'tazya1' });
  //       expect(updatedUser).toBe(expect.anything())
  //     });
  // });