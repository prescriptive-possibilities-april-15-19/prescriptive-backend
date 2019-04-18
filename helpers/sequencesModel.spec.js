const Sequences = require('./sequencesModel.js');
const database = require('../database/dbConfig.js');
const table = 'sequences';

<<<<<<< HEAD
beforeAll(async () => {
  await database.migrate.latest()
=======
beforeAll(() => {
  return database.migrate.latest()
>>>>>>> 0405c843913bad1232ef885732e53a7afd2ffd8c
    .then(() => {
      return database.seed.run();
    })
});

<<<<<<< HEAD
afterAll(async () => {
  await database(table).truncate();
});

=======
>>>>>>> 0405c843913bad1232ef885732e53a7afd2ffd8c

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

    expect(currTable).toContainEqual({seq_id: 1, sequence: "rowValue1"})
  })
});

describe('searchSequences', () => {
  it('should refuse a non-entry', async () => {
    const response = await Sequences.searchSequences();

    expect(response).toBe(null);
  })

  it('should refuse a string below the minimum length of 2', async () => {
    const response = await Sequences.searchSequences('a');

    expect(response).toBe(null);
  })

  it('should refuse an array, even if it has a length of 2', async () => {
    const response = await Sequences.searchSequences(['bad','joke']);

    expect(response).toBe(null);
  })

  it('should return an empty array if the query is valid but not present', async () => {
    const response = await Sequences.searchSequences('To be or not to be?');

    expect(response).toEqual([])
  })

  it('should return an array if it finds a partial match', async () => {

    const response = await Sequences.searchSequences('rowV');

    expect(response.length).toBeGreaterThan(0);
  })
<<<<<<< HEAD
=======

  it('should not return more than 10 items at a time, normally', async () => {

    const response = await Sequences.searchSequences('rowV');

    expect(response.length).toBeLessThan(11);
  })

  it('should paginate for real', async () => {
    const page1 = await Sequences.searchSequences('rowV');
    const page2 = await Sequences.searchSequences('rowV', 1);

    expect(page1).toEqual(expect.not.arrayContaining(page2));
  })
>>>>>>> 0405c843913bad1232ef885732e53a7afd2ffd8c
});


describe('insert()', () => {
  it('should insert the provided hobbits', async () => {
    const start = await database(table).select('*');

    await Sequences.insert({ sequence: 'gaffer' });
    await Sequences.insert({ sequence: 'aragorn' });
    await Sequences.insert({ sequence: 'gandalf' });
    
    const end = await database(table).select('*');

    expect(start > end);
  });

  it('should insert the provided item', async () => {
    const test = await Sequences.insert({ sequence: 'tazya' });

    expect(test).toBeTruthy();
  });
});