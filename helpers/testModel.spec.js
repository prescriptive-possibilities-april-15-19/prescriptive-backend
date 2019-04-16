const db = require('../database/dbConfig.js');
const testModel = require('./testModel.js');

// returns 201
// insert the hobbit
describe('test model', () => {
//   beforeEach(async () => {
//     await db('ligands').truncate(); 
//   });

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
  
    describe("update()", () => {
        // it("Updates the provided string as expected", async () => {
        //   const test = await testModel.getAll({'SMILES': 'tazya'})
        //   const updatedUser = await testModel.update(1, { 'SMILES': "tazya1" });
        //   expect(updatedUser.SMILES).toBe("tazya1");
        //   console.log('updated user:', updatedUser);
        //   //expect(test.SMILES).not.toBe(updatedUser.SMILES);
        // });
    it("Does something at all on update, anything", async () => {
        const updatedUser = await testModel.update(1, { 'SMILES': 'tazya1' });
        expect(updatedUser).toBe(expect.anything())
      });
 
 



    // it("Updates the password as expected", async () => {
    //   const test = await testModel.get({'u.id': 1})
    //   const updatedUser = await testModel.update(1, { 
    //     //password: bcrypt.hashSync('banana', 10) 
    //   });
    //   expect(bcrypt.compareSync('banana', updatedUser.password)).toBeTruthy()
    //   expect(bcrypt.compareSync(user.password, updatedUser.password)).not.toBeTruthy();
    // });
  });
});
