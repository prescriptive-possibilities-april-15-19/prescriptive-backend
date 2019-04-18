const Effects = require('./effectsModel.js');
const database = require('../database/dbConfig.js');
const table = 'lig2seq';

beforeAll(() => {
  return database.migrate.latest()
    .then(() => {
      return database.seed.run();
    })
});

it('should run in a test environment', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});

describe('table seeding', () => {
  it('should have a few items from seeding the table', async () => {
    const currTable = await database(table).select('*');

    expect(currTable.length).toBeGreaterThan(2);
  })

  it('should have an item I put there', async () => {
    const currTable = await database(table).select('*');

    expect(currTable).toContainEqual({effect_id: 1, lig_id: 1, seq_id: 1})
  })
});

describe('searchByFK', () => {

  it('should return something', async () => {
    const results = await Effects.searchByFK({ lig_id: 1 });

    expect(results).toBeTruthy();
  });

  it('should only return items with a given lig_id that was input', async () => {
    const query = 1;
    const results = await Effects.searchByFK({ lig_id: query });

    expect(results.every(match => match.lig_id === query)).toBe(true);
  });

  it('should only return items with a given seq_id if a seq_id is input', async () => {
    const query = 1;
    const results = await Effects.searchByFK({ seq_id: query });

    expect(results.every(match => match.seq_id === query)).toBe(true);
  });

  it('should only return a single item if both seq_id and lig_id are provided', async () => {
    const results = await Effects.searchByFK({ lig_id: 1, seq_id: 1 });

    expect(results.length).toEqual(1);
  });

  it('should return a prediction value in ideal cases', async () => {
    const result = await Effects.searchByFK({ lig_id: 1, seq_id: 1 });

    expect(result[0]).toHaveProperty('bind_chance');
  });

  it('might be cool if it returns a multi-join if I have a specific effect_id', async () => {
    const result = await Effects.searchByFK({ effect_id: 2 });

    expect(result[0]).toHaveProperty('SMILES');
    expect(result[0]).toHaveProperty('sequence');
  });

  // it('should handle errors', async () => {

  // });
});